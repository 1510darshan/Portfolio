import { useState, useEffect } from 'react';
import ManageData from './ManageData';

/**
 * Custom hook for fetching Firebase data
 * @param {string} dataType - Type of data to fetch (projects, skills, experiences, aboutMe, messages)
 * @param {string} category - Optional category filter for projects/skills
 * @returns {Object} { data, loading, error }
 */
export const useFirebase = (dataType, category = null) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                let result;

                switch (dataType) {
                    case 'projects':
                        result = category
                            ? await ManageData.getProjectByCategory(category)
                            : await ManageData.getAllProjects();
                        break;
                    case 'skills':
                        result = category
                            ? await ManageData.getSkillsByCategory(category)
                            : await ManageData.getAllSkills();
                        break;
                    case 'experiences':
                        result = await ManageData.getAllExperiences();
                        break;
                    case 'aboutMe':
                        result = await ManageData.getAboutMe();
                        break;
                    case 'messages':
                        result = await ManageData.getAllMessages();
                        break;
                    default:
                        throw new Error(`Unknown data type: ${dataType}`);
                }

                setData(result);
            } catch (err) {
                console.error(`Error fetching ${dataType}:`, err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dataType, category]);

    return { data, loading, error };
};

/**
 * Hook for sending contact form messages
 * @returns {Object} { sendMessage, loading, error, success }
 */
export const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const sendMessage = async (messageData) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            await ManageData.sendMessage(messageData);
            setSuccess(true);
            return true;
        } catch (err) {
            console.error('Error sending message:', err);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading, error, success };
};
