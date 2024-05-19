


export const generatePaginationNumbers = (currentPage: number, totalPages: number) =>{

  //si el numero total de páginas es 7 o menos
  //vamos a mostrar todas la paginas en el array sin puntos suspensivos '...'

  if (totalPages <= 7) {
  return Array.from({length: totalPages}, (_, i )=>i + 1) //[1,2,3,4,5,6,7]
  }

  // is la pagina actual esta entre las primeras 3 paginas
  // mostrar las primeras 3 puntos '...' y las ultimas 2

  if(currentPage <= 3){
    return [1,2,3,'...',totalPages - 1, totalPages]  // [1,2,3,...,49,50]
  }
  // si la pagina actual esta entre las ultimas 3 paginas
  // mostrar las premeras 2 puntos '...' y las ultimas 3

  if( currentPage >= totalPages - 2){
    return [1,2,'...',totalPages - 2, totalPages - 1, totalPages] // [1,2,...,48,49,50]
  }

  // si la pagina actual esta en un punto medio
  // mostrar la primera página, puntos '...', la pagina actual y vecinos

  return [1,'...',currentPage - 1, currentPage, currentPage + 1, '...', totalPages] //[1,...,34,35,36,...,50]
}