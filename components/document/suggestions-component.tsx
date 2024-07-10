import { useEffect, useState } from "react";
import { CheckCheckIcon, Trash, TriangleAlert } from "lucide-react";
import { Manrope } from "next/font/google";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";


interface Suggestion {
    index: {
      start: { line: number; column: number; offset: number };
      end: { line: number; column: number; offset: number };
    };
    [key: string]: any;
    message: string;
    original: string;
    suggestion: string;
    type: string;
  }

interface SuggestionsComponentProps {
    suggestions: Suggestion[]
    hightlightSuggestion:(suggestion:Suggestion)=>void
}

const manrope = Manrope({weight:['300','400','700'],subsets:['latin']});


const SuggestionsComponent = ({suggestions,hightlightSuggestion}:SuggestionsComponentProps) => {
    const [suggestionsWithTitles, setSuggestionsWithTitles] = useState<Suggestion[]>([]);
    const setSuggestion = () => {
        if (suggestions.length === 0) {
          return;
        }
        
        const updatedSuggestions = suggestions.map((suggestion) => {
          let title = '';
          switch (suggestion.type) {
            case 'retext-simplify':
              title = 'Simplify the text';
              break;
            case 'retext-quotes':
              title = 'Fix quotes';
              break;
            default:
              title = 'Other suggestions';
          }
          return { ...suggestion, title };
        });
        
        setSuggestionsWithTitles(updatedSuggestions);
      };

      const handleReject = (suggestionToReject: Suggestion) => {
        setSuggestionsWithTitles((prevSuggestions) => 
          prevSuggestions.filter((suggestion) => suggestion !== suggestionToReject)
        );
        toast.error('Suggestion rejected');
      };

      const handleAccept = (suggestion: Suggestion) => {
        hightlightSuggestion(suggestion);
        setSuggestionsWithTitles((prevSuggestions) => 
          prevSuggestions.filter((s) => s !== suggestion)
        );
        toast.success('Suggestion accepted');
      };


    useEffect(() => {
        setSuggestion();
    }, [suggestions]);
  return (
    suggestions.length > 0 && (
        <div>
            <div className="xl:hidden fixed bottom-1/4 right-0">
                <Sheet>
                    <SheetTrigger>
                        <Button variant='outline'>
                            <p>Review Suggestions</p>
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <div className="flex flex-col gap-5">
                                {!suggestionsWithTitles ? <div>No suggestions</div>: 
                                suggestionsWithTitles.map((suggestion,index)=> (
                                <div key={index}>
                                    <div className="mb-3 flex items-center gap-3 text-slate-500"><TriangleAlert /> {suggestion.title}</div>
                                    <div onClick={()=>{hightlightSuggestion(suggestion)}}>{suggestion.original} &rarr; {suggestion.suggestion}</div>
                                    <SheetClose className="flex gap-5 mt-3">
                                        <Button onClick={()=>handleAccept(suggestion)} size='icon' className="bg-teal-700"><CheckCheckIcon /></Button>
                                        <Button onClick={()=> handleReject(suggestion)} size='icon' variant='destructive'><Trash /></Button>
                                    </SheetClose>
                                    <Separator className="mt-5 bg-black" />
                                </div>
                                    ))
                                }
                        </div>  
                    </SheetContent>
                </Sheet>
            </div>
            <div className={`${manrope.className} bg-white shadow-lg px-10 py-20 rounded-l-xl opacity-90 fixed  bottom-0 right-0 top-0 overflow-scroll hidden xl:block`}>
                <div className="mb-10">
                    <div>
                        <p>Review Suggestions</p>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    {!suggestionsWithTitles ? <div>No suggestions</div>: 
                    suggestionsWithTitles.map((suggestion,index)=> (
                    <div key={index}>
                        <div className="mb-3 flex items-center gap-3 text-slate-500"><TriangleAlert /> {suggestion.title}</div>
                        <div onClick={()=>{hightlightSuggestion(suggestion)}}>{suggestion.original} &rarr; {suggestion.suggestion}</div>
                        <div className="flex gap-5 mt-3">
                            <Button onClick={()=>handleAccept(suggestion)} size='icon' className="bg-teal-700"><CheckCheckIcon /></Button>
                            <Button onClick={()=> handleReject(suggestion)} size='icon' variant='destructive'><Trash /></Button>
                        </div>
                        <Separator className="mt-5 bg-black" />
                    </div>
                        ))
                    }
                </div>  
            </div>
        </div>
    )
  )
}

export default SuggestionsComponent
