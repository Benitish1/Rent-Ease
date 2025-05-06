// lib/property.ts

export async function createProperty(formData: FormData): Promise<any> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        let errorMessage = 'Failed to create property';
        try {
            const errorData = await res.json();
            errorMessage = errorData.message || errorMessage;
        } catch (_) {
            // Fallback if JSON parse fails
        }
        throw new Error(errorMessage);
    }

    return res.json();
}

export async function deleteProperty(propertyId: string, landlordId: string): Promise<void> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${propertyId}?landlordId=${landlordId}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        let errorMessage = 'Failed to delete property';
        try {
            const errorData = await res.json();
            errorMessage = errorData.message || errorMessage;
        } catch (_) {
            // Fallback if JSON parse fails
        }
        throw new Error(errorMessage);
    }
}
