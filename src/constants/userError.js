export const documentsExist = (documents) => {
  return `One or more of the uploaded documents already exists

        * Required data: 
         -name : expected a string and received ${documents.name},
         -reference : expected a string and received ${documents.refence}
         `;
};
