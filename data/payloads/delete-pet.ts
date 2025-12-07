export function deletePetPayload(petId: number) {
  return {
    petId,
    api_key: 'special-key', // ONLY FOR TESTING PURPOSES, it's not a good practice to store it like this!! :D 
  };
}

