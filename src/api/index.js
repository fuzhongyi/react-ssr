import ajax from 'axios';

const basePath = 'https://5b8de85a5722ac0014317486.mockapi.io/api/node';

export const fetchNodes = () => ajax({method: 'get', url: basePath});
export const insertNode = (data) => ajax({method: 'post', url: basePath, data});
export const removeNode = (id) => ajax({method: 'delete', url: `${basePath}/${id}`});
