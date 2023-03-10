const HOST = "localhost";
const PORT = 8888;
const BASE_URL = `http://${HOST}:${PORT}`;


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

export const cpass = async (userData) => {
  
  try {
    const response = await fetch(`${BASE_URL}/changepass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      
    });

    
    const json = await response.json();
    
    
    if (response.status === 200) {
      return { success: true, data: json };
    } 
    else {
      
      return { success: false, error: json.error };
    }
  } catch (e) {
    
    return { success: false, error: e.message };
  }
};








