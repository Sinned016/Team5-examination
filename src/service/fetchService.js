
export default function fetchOptions(method, body) {
    return {
        method: method,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    }
}