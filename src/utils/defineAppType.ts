export const defineAppType = () => {
  const hostName = window.location.hostname;
  const domains = hostName.split('.');

  if (domains[0] === 'admin') return 'adminApp';

  return 'customerApp';
};
