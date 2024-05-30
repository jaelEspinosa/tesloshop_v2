import prisma from '../lib/prisma'
import { initialData } from "./seed";
import { countries } from './seed-countries';



async function main() {
  if (process.env.NODE_ENV === 'production') return;

 // 1. Borrar registros previos.
  /* await Promise.all( [ */
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
  
    await prisma.userAddress.deleteMany();
    await prisma.country.deleteMany();
    await prisma.user.deleteMany();
   
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
  /* ]); */
const { categories, products, users } = initialData  

//Users
await prisma.user.createMany({
  data: users
});




// Categorias

const categoriesData = categories.map( category => ({
  name: category
}));

await prisma.category.createMany({
  data:categoriesData
})

const categoriesDB = await prisma.category.findMany();

const categoriesMap = categoriesDB.reduce((map, category) =>{
  map[ category.name.toLowerCase()] = category.id
  return map;
}, {} as Record<string, string>)


//productos


products.forEach( async product => {
  const {type, images, ...rest} = product;
  
  const dbProduct = await prisma.product.create({
    data:{
      ...rest,
      categoryId: categoriesMap[type]
    }
  })
  //imagenes
  const imagesData = images.map( image => ({
    url:image,
    productId: dbProduct.id
  }));

  await prisma.productImage.createMany({
    data: imagesData
  });
});
// countries

await prisma.country.createMany({
  data: countries
})


 console.log('Seed ejecutado con éxito')
}



(() => {
  main();
})()