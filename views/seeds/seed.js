const { PrismaClient } = require('@prisma/client')
const faker = require('faker')

const prisma = new PrismaClient()

async function seed() {
  // Supprimer toutes les données existantes
  await prisma.utilisateur.deleteMany()
  await prisma.categorie.deleteMany()
  await prisma.article.deleteMany()
  await prisma.commentaire.deleteMany()

  // Créer 10 utilisateurs avec le rôle AUTHOR
  const users = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      const user = await prisma.utilisateur.create({
        data: {
          nom: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: 'AUTHOR'
        }
      })
      return user
    })
  )

  // Créer un utilisateur avec le rôle ADMIN
  const admin = await prisma.utilisateur.create({
    data: {
      nom: faker.name.findName(),
      email: 'admin@example.com',
      password: 'password',
      role: 'ADMIN'
    }
  })

  // Créer 10 catégories
  const categories = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      const category = await prisma.categorie.create({
        data: {
          nom: faker.commerce.department()
        }
      })
      return category
    })
  )

  // Créer 100 articles écrits par l'un des 10 auteurs et appartenant à 1 à 4 catégories aléatoires
  await Promise.all(
    Array.from({ length: 100 }).map(async () => {
      const author = faker.random.arrayElement(users)
      const numCategories = faker.random.number({ min: 1, max: 4 })
      const article = await prisma.article.create({
        data: {
          titre: faker.lorem.sentence(),
          contenu: faker.lorem.paragraphs(),
          image: faker.image.imageUrl(),
          published: faker.random.boolean(),
          auteur: {
            connect: { id: author.id }
          },
          categories: {
            connect: categories
              .sort(() => Math.random() - 0.5)
              .slice(0, numCategories)
              .map((c) => ({ id: c.id }))
          }
        }
      })

      // Créer de 0 à 20 commentaires pour chaque article
      const numComments = faker.random.number({ min: 0, max: 20 })
      await Promise.all(
        Array.from({ length: numComments }).map(async () => {
          const comment = await prisma.commentaire.create({
            data: {
              email: faker.internet.email(),
              contenu: faker.lorem.sentences(),
              article: {
                connect: { id: article.id }
              }
            }
          })
          return comment
        })
      )
      return article
    })
  )

  console.log('Seed completed.')
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
