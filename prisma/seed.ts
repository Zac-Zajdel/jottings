import { Jot, JotTemplate, Label, LabelAssociation, PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient()

/**
 * 1. yarn prisma migrate reset
 * 2. Login with oAuth
 * 3. yarn prisma db seed
 */
async function main() {
  const zac = await createUser()
  const jot = await createJot(zac)
  await createTemplate(zac)
  const label = await createLabel(zac)
  await createLabelAssociation(zac, label, jot)
}

async function createUser(): Promise<User> {
  return await prisma.user.upsert({
    where: { email: 'zaczajdel213@gmail.com' },
    update: {},
    create: {
      name: 'Zac Zajdel',
      email: 'zaczajdel213@gmail.com',
      image: 'https://lh3.googleusercontent.com/a/ACg8ocJlN4D5TQ7qfkl0VlDhQS9OH6z81fjqMu6TkvljqmtwlNY=s96-c',
    }
  })
}

async function createJot(user: User): Promise<Jot> {
  const jot = await prisma.jot.findFirst({
    where: {
      title: 'Chapter 1: In The Beginning',
      authorId: user.id,
    }
  });

  return jot ?? await prisma.jot.create({
    data: {
      title: 'Chapter 1: In The Beginning',
      content: [
        {"id":"jcv8h","type":"h1","children": [{"text":"In The Beginning…"}]},
        {"id":"4qhtb","type":"p","align":"start","children":[{"text":""}]},
        {"id":"xj3p3","type":"p","align":"start","indent":1,"children":[{"text":"Technology emerged as a catalyst for unprecedented advancements, reshaping the landscape of human interaction and innovation. At its core, technology is the driving force behind our modern era, propelling us into an era of unprecedented connectivity and efficiency. From the inception of the internet to the proliferation of smart devices, technology has become an integral part of our daily lives."}],"listStyleType":"disc"},
        {"id":"qpz65","type":"p","align":"start","indent":1,"children":[{"text":"The rapid evolution of technology has not only revolutionized communication but has also spurred groundbreaking developments across various industries. Artificial intelligence, for instance, is transforming the way we approach problem-solving and decision-making, ushering in an era of unprecedented automation and efficiency. The fusion of technology and healthcare has given rise to innovative treatments and diagnostic tools, enhancing the quality of patient care."}],"listStart":2,"listStyleType":"disc"},
        {"id":"3h4py","type":"p","align":"start","indent":1,"children":[{"text":"Moreover, the rise of big data and analytics has empowered businesses with valuable insights, enabling data-driven strategies for growth and adaptability. In the realm of education, technology has democratized access to information, providing learners worldwide with new avenues for knowledge acquisition and skill development."}],"listStart":3,"listStyleType":"disc"},
        {"id":"7qu8w","type":"p","align":"start","indent":1,"children":[{"text":"As we navigate the ever-changing landscape of technology, the possibilities seem boundless. From the Internet of Things (IoT) connecting our devices to the potential of quantum computing, the trajectory of technological progress continues to shape the way we live, work, and envision the future."}],"listStart":4,"listStyleType":"disc"}
      ],
      status: 'Draft',
      priority: null,
      published: false,
      authorId: user.id,
    }
  })
}

async function createTemplate(user: User): Promise<JotTemplate> {
  const jotTemplate = await prisma.jotTemplate.findFirst({
    where: {
      title: 'Support Ticket Workflow',
      authorId: user.id,
    }
  });

  return jotTemplate ?? await prisma.jotTemplate.create({
    data: {
      title: 'Support Ticket Workflow',
      authorId: user.id,
      content: [
        {"id":"0lkqc","type":"p","indent":0,"children":[{"bold":true,"text":"Ticket ID","color":"rgb(209, 213, 219)","fontSize":"16px"},{"text":": A unique identifier for each ticket.","color":"rgb(209, 213, 219)","fontSize":"16px"}],"listStyleType":""},
        {"id":"isth8","type":"p","indent":0,"children":[{"bold":true,"text":"Customer Name","color":"rgb(209, 213, 219)","fontSize":"16px"},{"text":": The name of the customer who raised the issue.","color":"rgb(209, 213, 219)","fontSize":"16px"}],"listStyleType":""},
        {"id":"kh4yp","type":"p","indent":0,"children":[{"bold":true,"text":"Contact Information","color":"rgb(209, 213, 219)","fontSize":"16px"},{"text":": Email, phone number, or other contact details of the customer.","color":"rgb(209, 213, 219)","fontSize":"16px"}],"listStyleType":""},
        {"id":"o28zd","type":"p","indent":0,"children":[{"bold":true,"text":"Date/Time Reported","color":"rgb(209, 213, 219)","fontSize":"16px"},{"text":": When the issue was reported.","color":"rgb(209, 213, 219)","fontSize":"16px"}],"listStyleType":""},
        {"id":"mkqv4","type":"p","indent":0,"children":[{"bold":true,"text":"Issue Category","color":"rgb(209, 213, 219)","fontSize":"16px"},{"text":": Broad classification of the issue (e.g., Billing, Technical Support, Product Inquiry).","color":"rgb(209, 213, 219)","fontSize":"16px"}],"listStyleType":""},
        {"id":"qp5w3","type":"p","indent":0,"children":[{"bold":true,"text":"Description of Issue","color":"rgb(209, 213, 219)","fontSize":"16px"},{"text":": Detailed description of the customer's problem or question.","color":"rgb(209, 213, 219)","fontSize":"16px"}],"listStyleType":""},
        {"id":"gez04","type":"p","indent":0,"children":[{"bold":true,"text":"Priority Level","color":"rgb(209, 213, 219)","fontSize":"16px"},{"text":": Urgency of the issue (e.g., Low, Medium, High).","color":"rgb(209, 213, 219)","fontSize":"16px"}],"listStyleType":""},
        {"id":"r2bne","type":"p","indent":0,"children":[{"bold":true,"text":"Assigned To","color":"rgb(209, 213, 219)","fontSize":"16px"},{"text":": The name of the support agent or team responsible for addressing the ticket.","color":"rgb(209, 213, 219)","fontSize":"16px"}],"listStyleType":""},
        {"id":"uqqt1","type":"p","indent":0,"children":[{"bold":true,"text":"Status","color":"rgb(209, 213, 219)","fontSize":"16px"},{"text":": Current status of the ticket (e.g., Open, In Progress, Awaiting Customer Reply, Resolved).","color":"rgb(209, 213, 219)","fontSize":"16px"}],"listStyleType":""},
        {"id":"yiwad","type":"p","indent":0,"children":[{"bold":true,"text":"Actions Taken","color":"rgb(209, 213, 219)","fontSize":"16px"},{"text":": Summary of steps taken to resolve the issue.","color":"rgb(209, 213, 219)","fontSize":"16px"}],"listStyleType":""},
        {"id":"kpc1t","type":"p","indent":0,"children":[{"bold":true,"text":"Resolution Date/Time","color":"rgb(209, 213, 219)","fontSize":"16px"},{"text":": When the issue was resolved or closed.","color":"rgb(209, 213, 219)","fontSize":"16px"}],"listStyleType":""},
        {"id":"ovk8f","type":"p","indent":0,"children":[{"bold":true,"text":"Customer Feedback","color":"rgb(209, 213, 219)","fontSize":"16px"},{"text":": Comments or ratings provided by the customer regarding the support experience.","color":"rgb(209, 213, 219)","fontSize":"16px"}],"listStyleType":""},
      ],
      isPublished: false,
    }
  })
}

async function createLabel(user: User): Promise<Label> {
  const label = await prisma.label.findFirst({
    where: {
      authorId: user.id,
      name: 'Chapter 1',
    }
  })

  return label ?? await prisma.label.create({
    data: {
      authorId: user.id,
      name: 'Chapter 1',
      color: '408aec',
    }
  })
}

async function createLabelAssociation(user: User, label: Label, jot: Jot): Promise<LabelAssociation> {
  const labelAssociation = await prisma.labelAssociation.findFirst({
    where: {
      labelId: label.id,
      jotId: jot.id,
      authorId: user.id
    }
  })

  return labelAssociation ?? await prisma.labelAssociation.create({
    data: {
      authorId: user.id,
      labelId: label.id,
      jotId: jot.id,
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })