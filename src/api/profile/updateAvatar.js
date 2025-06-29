import api from "../client";

export const updateAvatar = async (name, avatarUrl, altText = "") => {
  try {
    const response = await api.put(`/holidaze/profiles/${name}`, {
      avatar: {
        url: avatarUrl,
        alt: altText || name,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Failed to update avatar:", error);
    throw new Error("Could not update avatar.");
  }
};
