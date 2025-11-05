const API_URL = "http://127.0.0.1:8000/api/plan/";

export async function getTasks(token) {
const response = await fetch(API_URL, {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
    },
});

if (!response.ok) {
    throw new Error("Failed to fetch tasks");
}

    return await response.json();
 }
