function mongoQueryError(error) {
  const err = [];
  if (error.name === 'ValidationError') Object.values(error.errors).map((val) => err.push(val.message));
  if (error.keyValue) err.push(`${Object.values(error.keyValue)[0]}, already exists`);
  if (error.name === 'CastError' && error.kind === 'Boolean') err.push(`${error.path} expected to be boolean`);
  if (error.kind === 'ObjectId' && error.reason) err.push('something wrong with your object id, please check it');
  if (error.name === 'SyntaxError') err.push('Syntax error in request');
  return err;
}

function mongoModelCode(typeError, field) {
  switch (typeError) {
    case 1:
      return `${field}. It is mandatory`;
    case 2:
      return `Invalid ${field}`;
    case 3:
      return `Array of ${field} contain a wrong ID (s).`;
    case 4:
      return `${field} already exists`;
    case 5:
      return `Invalid Object ID (${field}). Please check it.`;
    default:
      return field;
  }
}
module.exports = { mongoModelCode, mongoQueryError };
