import {retext} from 'retext';
import retextEnglish from 'retext-english';
import retextSyntaxUrls from 'retext-syntax-urls';
import retextRepeatedWords from 'retext-repeated-words';
import retextIndefiniteArticle from 'retext-indefinite-article';
import retextSentenceSpacing from 'retext-sentence-spacing';
import retextQuotes from 'retext-quotes';
import retextSimplify from 'retext-simplify';


export const processText = async(text:string) => {
    const processor = retext()
        .use(retextEnglish)
        .use(retextSimplify)
        .use(retextSyntaxUrls)
        .use(retextSentenceSpacing)
        .use(retextIndefiniteArticle)
        .use(retextQuotes,{preferred:'straight'})
        .use(retextRepeatedWords);

    const processedText = await processor.process(text);

    const suggestions = processedText.messages.map((message)=> ({
        type: message.source,
        index:message.place,
        original:message.actual,
        suggestion:message.expected ? message.expected[0] : null,
        message:message.reason,
    }))
    return suggestions;
}