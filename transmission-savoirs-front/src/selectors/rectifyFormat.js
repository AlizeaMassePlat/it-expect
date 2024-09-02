function rectifyFormat(date) {
  const myDate = date.slice(0, 10);
  const chunks = myDate.split('-');
  return `${chunks[2]}/${chunks[1]}/${chunks[0]}`;
}

export default rectifyFormat;
