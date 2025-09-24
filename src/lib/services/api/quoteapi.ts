export async function getDollarQuote(): Promise<string> {
    try {
      const response = await fetch(
        "https://economia.awesomeapi.com.br/json/last/USD-BRL"
      );
      const data = await response.json();
      const bid = parseFloat(data.USDBRL.bid);
      return bid.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    } catch (error) {
      console.error("Erro ao buscar cotação do Dólar:", error);
      return "N/A";
    }
  }
  
  export async function getIbovespaQuote(): Promise<string> {
    try {
      const response = await fetch('/api/ibovespa'); 
  
      if (!response.ok) {
        console.error("Erro na rota de proxy do Ibovespa:", response.statusText);
        return "N/A";
      }
      
      const data = await response.json();
  
      // A estrutura da Brapi para o Ibovespa está em 'results[0]'
      if (data && data.results && data.results.length > 0) {
        const points = data.results[0].regularMarketPrice;
        return points.toLocaleString("pt-BR", {maximumFractionDigits: 2});
      } else {
        console.error("A resposta da API do Ibovespa (Brapi) não está no formato esperado:", data);
        return "N/A";
      }
    } catch (error) {
      console.error("Erro ao buscar cotação do Ibovespa via proxy:", error);
      return "N/A";
    }
  }