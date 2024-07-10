import FileSaver from 'file-saver'
interface DownloadButton {
    document_id: number;
    children: React.ReactNode;
}

const DownloadButton = ({document_id,children}:DownloadButton) => {
    const downloadDocX = async() => {
        try {
        const response = await fetch('/api/document-download',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({document_id}),
        })

        if (!response.ok) {
            throw new Error('Failed to convert document');
        }

        const contentDisposition = response.headers.get('Content-Disposition');
        const filenameMatch = contentDisposition && contentDisposition.match(/filename="?(.+)"?/i);
        const filename = filenameMatch ? filenameMatch[1] : 'document.docx';

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename.substring(0, filename.lastIndexOf('.'));
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <button onClick={downloadDocX}>
        {children}
    </button>
  )
}

export default DownloadButton
