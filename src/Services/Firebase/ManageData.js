import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    deleteDoc,
    getDoc,
    setDoc
} from "firebase/firestore";

import { app } from "./Firebase.js";

const firestore = getFirestore(app);

class ManageData {
    // ────────────────────────────────────────────────────────
    // Projects
    // ────────────────────────────────────────────────────────
    
    async insertProject(projectData) {
        try {
            const result = await addDoc(
                collection(firestore, "Projects"),
                projectData
            );
            console.log("Project added with ID:", result.id);
            return result.id;
        } catch (error) {
            console.error("Error adding project:", error);
            throw error;
        }
    }

    async getAllProjects() {
        try {
            const snapshot = await getDocs(collection(firestore, "Projects"));
            const projects = [];
            snapshot.forEach((doc) => {
                projects.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return projects;
        } catch (error) {
            console.error("Error fetching projects:", error);
            throw error;
        }
    }

    async getProjectByCategory(category) {
        try {
            const collectionRef = collection(firestore, "Projects");
            const q = query(
                collectionRef,
                where("category", "==", category)
            );
            const snapshot = await getDocs(q);
            const projects = [];
            snapshot.forEach((doc) => {
                projects.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return projects;
        } catch (error) {
            console.error("Error fetching projects by category:", error);
            throw error;
        }
    }

    async updateProject(projectId, projectData) {
        try {
            const projectRef = doc(firestore, "Projects", projectId);
            await updateDoc(projectRef, projectData);
            console.log("Project updated successfully");
        } catch (error) {
            console.error("Error updating project:", error);
            throw error;
        }
    }

    async deleteProject(projectId) {
        try {
            await deleteDoc(doc(firestore, "Projects", projectId));
            console.log("Project deleted successfully");
        } catch (error) {
            console.error("Error deleting project:", error);
            throw error;
        }
    }

    // ────────────────────────────────────────────────────────
    // About Me
    // ────────────────────────────────────────────────────────

    async getAboutMe() {
        try {
            const docRef = doc(firestore, "AboutMe", "profile");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No About Me data found");
                return null;
            }
        } catch (error) {
            console.error("Error fetching About Me:", error);
            throw error;
        }
    }

    async updateAboutMe(data) {
        try {
            const docRef = doc(firestore, "AboutMe", "profile");
            await setDoc(docRef, data, { merge: true });
            console.log("About Me updated successfully");
        } catch (error) {
            console.error("Error updating About Me:", error);
            throw error;
        }
    }

    // ────────────────────────────────────────────────────────
    // Skills
    // ────────────────────────────────────────────────────────

    async getAllSkills() {
        try {
            const snapshot = await getDocs(collection(firestore, "Skills"));
            const skills = [];
            snapshot.forEach((doc) => {
                skills.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return skills.sort((a, b) => a.order - b.order);
        } catch (error) {
            console.error("Error fetching skills:", error);
            throw error;
        }
    }

    async getSkillsByCategory(category) {
        try {
            const collectionRef = collection(firestore, "Skills");
            const q = query(
                collectionRef,
                where("category", "==", category)
            );
            const snapshot = await getDocs(q);
            const skills = [];
            snapshot.forEach((doc) => {
                skills.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return skills;
        } catch (error) {
            console.error("Error fetching skills by category:", error);
            throw error;
        }
    }

    async insertSkill(skillData) {
        try {
            const result = await addDoc(
                collection(firestore, "Skills"),
                skillData
            );
            console.log("Skill added with ID:", result.id);
            return result.id;
        } catch (error) {
            console.error("Error adding skill:", error);
            throw error;
        }
    }

    async updateSkill(skillId, skillData) {
        try {
            const skillRef = doc(firestore, "Skills", skillId);
            await updateDoc(skillRef, skillData);
            console.log("Skill updated successfully");
        } catch (error) {
            console.error("Error updating skill:", error);
            throw error;
        }
    }

    async deleteSkill(skillId) {
        try {
            await deleteDoc(doc(firestore, "Skills", skillId));
            console.log("Skill deleted successfully");
        } catch (error) {
            console.error("Error deleting skill:", error);
            throw error;
        }
    }

    // ────────────────────────────────────────────────────────
    // Experience
    // ────────────────────────────────────────────────────────

    async getAllExperiences() {
        try {
            const snapshot = await getDocs(collection(firestore, "Experience"));
            const experiences = [];
            snapshot.forEach((doc) => {
                experiences.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return experiences;
        } catch (error) {
            console.error("Error fetching experiences:", error);
            throw error;
        }
    }

    async insertExperience(experienceData) {
        try {
            const result = await addDoc(
                collection(firestore, "Experience"),
                experienceData
            );
            console.log("Experience added with ID:", result.id);
            return result.id;
        } catch (error) {
            console.error("Error adding experience:", error);
            throw error;
        }
    }

    async updateExperience(experienceId, experienceData) {
        try {
            const experienceRef = doc(firestore, "Experience", experienceId);
            await updateDoc(experienceRef, experienceData);
            console.log("Experience updated successfully");
        } catch (error) {
            console.error("Error updating experience:", error);
            throw error;
        }
    }

    async deleteExperience(experienceId) {
        try {
            await deleteDoc(doc(firestore, "Experience", experienceId));
            console.log("Experience deleted successfully");
        } catch (error) {
            console.error("Error deleting experience:", error);
            throw error;
        }
    }

    // ────────────────────────────────────────────────────────
    // Messages / Contact Form
    // ────────────────────────────────────────────────────────

    async sendMessage(messageData) {
        try {
            const result = await addDoc(
                collection(firestore, "Messages"),
                {
                    ...messageData,
                    timestamp: new Date(),
                    read: false
                }
            );
            console.log("Message sent with ID:", result.id);
            return result.id;
        } catch (error) {
            console.error("Error sending message:", error);
            throw error;
        }
    }

    async getAllMessages() {
        try {
            const snapshot = await getDocs(collection(firestore, "Messages"));
            const messages = [];
            snapshot.forEach((doc) => {
                messages.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return messages;
        } catch (error) {
            console.error("Error fetching messages:", error);
            throw error;
        }
    }
}

export default new ManageData();

