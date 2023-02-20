const HOST = "localhost";
const PORT = 9090;
const BASE_URL = `http://${HOST}:${PORT}/pmi`;


export const login = async (userData) => {
  try {
    
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify(userData),
    });
    
    const json = await response.json();
    
    if (response.status === 200) {
      return { success: true, token: json };
    } else {
      return { success: false, error: json.error };
    }
  } catch (e) {
    return { success: false, error: e.message };
  }
};

export const getProjects = async (userData) => {
  try {

   
    
    const response = await fetch(`${BASE_URL}/getProjects/${userData}`, {
      method: "GET",
     
    });

    
    
    const json = await response.json();
  
    if (response.status === 200) {
      return { success: true, projects: json };
    } else {
      return { success: false, error: json.error };
    }
  } catch (e) {
    return { success: false, error: e.message };
  }
};










