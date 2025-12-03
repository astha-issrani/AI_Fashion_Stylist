import "dotenv/config";

// It automatically imports dotenv
// And automatically calls .config() for you
// Without you having to write it manually

const getapiresponse=async(message)=>{
    const options={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body:JSON.stringify({
            "model": "llama-3.3-70b-versatile",
            "messages": [{
                role: "user",
                content: message
            }]
        })
    };
    try{
        const response=await fetch("https://api.groq.com/openai/v1/chat/completions",options);
        // fetch() does NOT return data immediately.
        // It returns a Promise:
        // Promise { <pending> }
        const data=await response.json();
        // await pauses only THIS function, not the whole server
        console.log(data.choices[0].message.content);
        return data.choices[0].message.content;
    }
    catch(err){
        console.log("error detected",err);
    }
}

export default getapiresponse;