import axios from "../axiosConfig"

export const handleIdeaSubmission = async (email,ideaTitle,ideaDescription,domain) => {
    try {
        const response = await axios.post(`participant/submit-idea`);
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.error("Submission Failed", e.response ? e.response.data : e.message)
        throw e;
    }
}