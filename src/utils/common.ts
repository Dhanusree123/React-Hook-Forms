export const getAvatarLetters = (text:string) => {
    if(!text) return;
    const names = text.split(" ");
    if(names.length === 1){
        return names[0].substring(0,1);
    }
    return `${names[0][0] || ''}${names[1][0]||''}`
}