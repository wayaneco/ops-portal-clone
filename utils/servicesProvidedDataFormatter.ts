// Function to convert strings to snake_case
const toSnakeCase = (str: string) => {
  return str
    .toLowerCase()      // Convert to lowercase
    .replace(/\s+/g, '_'); // Replace spaces with underscores
}

// Formatter function to apply snake_case conversion to each label
const servicesProvidedDataFormatter = (data: {label: string, count: string}[]) => {
  return data.map((item) => ({
    ...item,
    label: toSnakeCase(item.label), // Format the label
  }));
}

export default servicesProvidedDataFormatter;