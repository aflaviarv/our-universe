export function encodeUniverse(universeData) {
  try {
    const jsonString = JSON.stringify(universeData);
    // encodeURIComponent garante que acentos e espaços não quebrem a URL
    return btoa(encodeURIComponent(jsonString));
  } catch (error) {
    console.error("Erro ao compactar dados:", error);
    return "";
  }
}

export function decodeUniverse(encodedData) {
  try {
    if (!encodedData) return null;
    const jsonString = decodeURIComponent(atob(encodedData));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Erro ao descompactar dados da URL:", error);
    return null;
  }
}