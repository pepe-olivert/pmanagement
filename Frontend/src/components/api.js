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


export const updateproject = async (userData) => {
  try {
    
    const response = await fetch(`${BASE_URL}/updateproject`, {
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


export const setProject = async (projectData) => {
  try {
    
    const response = await fetch(`${BASE_URL}/setProject`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(projectData),
    });
    
    
    const json = await response.json();
    console.log(json)
    
    if (response.status === 200) {
      return { success: true, token: json };
    } else {
      return { success: false, error: json.error };
    }
  } catch (e) {
    return { success: false, error: e.message };
  }
};

export const updatetask = async (userData) => {
  try {

    
    
    const response = await fetch(`${BASE_URL}/createTask`, {
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

export const updateP = async (userData) => {
  try {

    
    
    const response = await fetch(`${BASE_URL}/updateP`, {
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

export const updatem = async (userData) => {
  try {
    
    const response = await fetch(`${BASE_URL}/updateM`, {
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

export const updateprojectstate = async (userData) => {
  try {
    
    const response = await fetch(`${BASE_URL}/updateprojectstate`, {
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


export const showTasks = async (userData) => {
  try {

    
    
    const response = await fetch(`${BASE_URL}/showtasks/${userData}`, {
      method: "GET",
     
    });

    
    
    const json = await response.json();
  
    if (response.status === 200) {
      return { success: true, tasks: json };
    } else {
      return { success: false, error: json.error };
    }
  } catch (e) {
    return { success: false, error: e.message }; 
  }
};

export const showM = async (userData) => {
  try {

    
    
    const response = await fetch(`${BASE_URL}/showm/${userData}`, {
      method: "GET",
     
    });

    
    
    const json = await response.json();
  
    if (response.status === 200) {
      return { success: true, tasks: json };
    } else {
      return { success: false, error: json.error };
    }
  } catch (e) {
    return { success: false, error: e.message }; 
  }
};

export const setTeamMember = async (projectData) => {
  try {
    
    const response = await fetch(`${BASE_URL}/setTeamMember`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify(projectData),
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

export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getUsers`, {

      method: "GET",
     
    });

    
    
    const json = await response.json();
  
    if (response.status === 200) {

      return { success: true, users: json };

    } else {
      return { success: false, error: json.error };
    }
  } catch (e) {
    return { success: false, error: e.message };
  }


  
};


export const getRol = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getRol`, {
      method: "GET",
     
    });

    
    
    const json = await response.json();
  
    if (response.status === 200) {
      return { success: true, users: json };
    } else {
      return { success: false, error: json.error };
    }
  } catch (e) {
    return { success: false, error: e.message };
  }

  
};










