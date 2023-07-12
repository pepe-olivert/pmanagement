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

export const register = async (userData) => {
  try {
    
    const response = await fetch(`${BASE_URL}/register`, {
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

export const addTmb = async (userData) => {
  try {
    
    const response = await fetch(`${BASE_URL}/addtmb`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify(userData),

      

    });
    
    const json = await response.json();
    
    if (response.status === 200) {
      return { success: true, added: json };
    } else {
      return { success: false, error: json.error };
    }
  } catch (e) {
    return { success: false, error: e.message };
  }
};

export const addTmbtask = async (userData) => {
  try {
    
    const response = await fetch(`${BASE_URL}/addtmbtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify(userData),

      

    });
    
    const json = await response.json();
    
    if (response.status === 200) {
      return { success: true, added: json };
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

export const showtmbtasks = async (userData,pid) => {
  try {

   
    
    const response = await fetch(`${BASE_URL}/showtmbtasks/${userData}/${pid}`, {
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

export const showTeamMembers = async (data) => {
  try {

   
    
    const response = await fetch(`${BASE_URL}/showtm/${data}`, {
      method: "GET",
     
    });

    
    
    const json = await response.json();
  
    if (response.status === 200) {
      return {members: json };
    } else {
      return { success: false, error: json.error };
    }
  } catch (e) {
    return { success: false, error: e.message };
  }
};

export const infotask = async (userData) => {
  try {

   
    
    const response = await fetch(`${BASE_URL}/infotask/${userData}`, {
      method: "GET",
     
    });

    
    
    const json = await response.json();
   
  
    if (response.status === 200) {
      return { success: true, item: json };
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


export const getrol = async (userData) => {
  try {

    
    
    const response = await fetch(`${BASE_URL}/getrol/${userData}`, {
      method: "GET",
     
    });

    
    
    const json = await response.json();
  
    if (response.status === 200) {
      return { success: true, rol: json };
    } else {
      return { success: false, error: json.error };
    }
  } catch (e) {
    return { success: false, error: e.message }; 
  }
};

export const gettasksid = async (userData) => {
  try {

    const response = await fetch(`${BASE_URL}/gettasksid/${userData}`, {
      method: "GET",
     
    });

    const json = await response.json();
  
    if (response.status === 200) {
      return { success: true, tasksid: json };
    } else {
      return { success: false, error: json.error };
    }
  } catch (e) {
    return { success: false, error: e.message }; 
  }
};

export const gettasksbyid = async (userData) => {
  try {

    const response = await fetch(`${BASE_URL}/gettasksbyid/${userData}`, {
      method: "GET",
     
    });

    const json = await response.json();
  
    if (response.status === 200) {
      return { success: true, tasksbyid: json };
    } else {
      return { success: false, error: json.error };
    }
  } catch (e) {
    return { success: false, error: e.message }; 
  }
};










