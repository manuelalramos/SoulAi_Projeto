export function obterImagemUrl(valor?: string | null){
    if(!valor?.trim()) return "";
    try{
        const url = new URL(valor.trim());
        return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
    } catch{
        return "";
    }
}