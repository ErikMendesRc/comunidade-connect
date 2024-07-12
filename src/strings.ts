const strings = {
  sidebar: {
    profile: "Meu Perfil",
    members: "Lista de Membros",
    messages: "Mensagens",
    signOut: "Sair",
    editProfile: "Editar perfil"
  },
  header: {
    logoAlt: "Comunidade Connect Logo",
    home: "Início",
    about: "Sobre",
    services: "Serviços",
    contact: "Contato",
    login: "Fazer login",
    register: "Registrar-se",
    notifications: "Notificações",
    profileMenu: {
      dashboard: "Dashboard",
      settings: "Configurações",
      earnings: "Ganhos",
      signOut: "Sair",
    },
    openMenu: "Abrir Menu",
  },
  footer: {
    logoAlt: "Comunidade Connect Logo",
    about: "Sobre",
    privacyPolicy: "Política de Privacidade",
    licensing: "Licenciamento",
    contact: "Contato",
    allRightsReserved: "Todos os direitos reservados.",
  },
  highlightSection: {
    title: "Nossa Comunidade",
    description: "A comunidade Connect foi fundada em 2021 com a missão de unir empresários em busca de aperfeiçoamento e oportunidades de networking.",
    links: [
      "Conheça nossa liderança"
    ],
    stats: [
      { label: "Membros na comunidade", value: "12" },
      { label: "Networks criado", value: "300+" },
    ]
  },
  testimonials: {
    title: "Depoimentos",
    description: "Veja o que nossos membros estão dizendo sobre a comunidade.",
    role: "Função",
    reviews: [
      {
        quote: "Essa comunidade é fantástica! As conexões que fiz aqui foram extremamente valiosas.",
        name: "João Silva",
        position: "Engenheiro de Software",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        quote: "A troca de conhecimentos e experiências aqui é inestimável.",
        name: "Maria Oliveira",
        position: "Designer Gráfico",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
      }
    ]
  },
  profileSettings: {

  },
  registerForm: {
    generalInformation: "Informações Pessoais",
    createAccount: "Criar Conta",
    alreadyHaveAccount: "Já tem uma conta ?",
    signInWithGoogle: "Continuar com Google",
    or: "Ou",
    name: "Nome",
    enterName: "Digite seu nome",
    lastName: "Sobrenome",
    enterLastName: "Digite seu sobrenome",
    email: "Email",
    enterEmail: "Digite seu email",
    phone: "Telefone",
    enterPhone: "Digite seu telefone",
    profilePicture: "Foto de Perfil",
    enterProfilePicture: "Link da sua foto de perfil",
    password: "Senha",
    enterPassword: "Digite sua senha",
    confirmPassword: "Confirmar Senha",
    enterConfirmPassword: "Digite sua senha novamente",
    bio: "Bio",
    enterBio: "Fale sobre você",
    location: "Localização",
    enterLocation: "Digite sua localização",
    country: "País",
    enterCountry: "Digite seu país",
    city: "Cidade",
    enterCity: "Digite sua cidade",
    birthday: "Aniversário",
    enterBirthday: "Digite sua data de aniversário",
    company: "Empresa",
    enterCompany: "Digite o nome da sua empresa",
    role: "Cargo",
    enterRole: "Digite seu cargo",
    department: "Departamento",
    enterDepartment: "Digite seu departamento",
    zip: "CEP",
    enterZip: "Digite seu CEP",
    years: "Anos de Experiência",
    enterYears: "Digite seus anos de experiência",
    linkedin: "LinkedIn",
    enterLinkedin: "Deixe a URL do seu LinkedIn",
    loginHere: "Faça login aqui",
    login: "Entrar",
    address:"Endereço",
    saveAll: "Salvar",

    validation: {
      email: {
        invalid: "Endereço de email inválido",
        required: "Email é obrigatório",
      },
      password: {
        minLength: "A senha deve ter pelo menos 6 caracteres",
        required: "Senha é obrigatória",
      },
      confirmPassword: {
        match: "As senhas devem corresponder",
        required: "Confirmação de senha é obrigatória",
      },
      name: {
        required: "Nome é obrigatório",
      },
      lastName: {
        required: "Sobrenome é obrigatório",
      },
      contact: {
        required: "Telefone é obrigatório",
      },
      bio: {
        required: "Bio é obrigatória",
      },
      location: {
        required: "Localização é obrigatória",
      },
      country: {
        required: "País é obrigatório",
      },
      city: {
        required: "Cidade é obrigatória",
      },
      company: {
        required: "Empresa é obrigatória",
      },
      role: {
        required: "Cargo é obrigatório",
      },
      years: {
        required: "Anos de experiência são obrigatórios",
      },
      linkedin: {
        url: "URL do LinkedIn inválida",
        required: "LinkedIn é obrigatório",
      },
      birthday: {
        required: "Aniversário é obrigatório",
      },
      department: {
        required: "Departamento é obrigatório",
      },
      zip: {
        required: "CEP é obrigatório",
      },
    },
  },
  editSkills: {
    title: "Habilidades",
    placeholder: "Adicione suas Habilidades profissionais.",
    save: "Salvar",
    successMessage: "Novas Habilidades Salvas com Sucesso!"
  },
  editHobbies: {
    title: "Hobbies",
    placeholder: "Adicione seus Hobbies",
    save: "Salvar",
    successMessage: "Hobbies Salvos com Sucesso!"
  },
  editCompanyInformation: {
    title: "Informações da Empresa",
    companyName: "Nome da Empresa",
    industry: "Setor",
    founded: "Fundada",
    headquarters: "Sede",
    numberOfEmployees: "Número de Funcionários",
    website: "Website",
    annualTurnover: "Faturamento Anual",
    placeholder: {
      companyName: "Digite o nome da empresa",
      industry: "Digite o setor",
      founded: "Digite o ano de fundação",
      headquarters: "Digite a sede",
      numberOfEmployees: "Digite o número de funcionários",
      website: "Digite a URL do website",
      annualTurnover: "Digite o Faturamento Anual",
    },
    save: "Salvar",
    successMessage: "Informações da empresa atualizadas com sucesso!",
    validation: {
      companyName: "Nome da empresa é obrigatório",
      industry: "Setor é obrigatório",
      founded: "Ano de fundação é obrigatório",
      headquarters: "Sede é obrigatória",
      numberOfEmployees: "Número de funcionários é obrigatório",
      annualTurnover: "Faturamento Anual obrigatório",
      website: {
        url: "URL inválida",
        required: "Website é obrigatório",
      }
    }
  },
  editPasswordInformation: {
    title: "Informações da Senha",
    currentPassword: "Senha Atual",
    newPassword: "Nova Senha",
    confirmPassword: "Confirmar Senha",
    placeholder: {
      currentPassword: "Digite a senha atual",
      newPassword: "Digite a nova senha",
      confirmPassword: "Confirme a nova senha",
    },
    save: "Salvar",
    successMessage: "Senha atualizada com sucesso!",
    validation: {
      currentPassword: "Senha atual é obrigatória",
      newPassword: {
        minLength: "A nova senha deve ter pelo menos 6 caracteres",
        required: "Nova senha é obrigatória",
      },
      confirmPassword: {
        match: "As senhas devem corresponder",
        required: "Confirmação de senha é obrigatória",
      },
    },
  },
  generalInformation: {
    title: "Informações Gerais",
    aboutMe: "Sobre mim",
    role: "Cargo",
    department: "Departamento",
    birthday: "Aniversário",
    bio: "Fale sobre você",
    years: "Anos de Experiência",
    yearsSuffix: "anos na área",
    linkedin: "LinkedIn"
  },
  companyInformation: {
    title: "Informações da Empresa",
    aboutCompany: "Sobre a Empresa",
    companyName: "Nome da Empresa",
    industry: "Setor",
    founded: "Fundada há",
    headquarters: "Cidade Sede",
    numberOfEmployees: "Número de Funcionários",
    annualTurnover: "Faturamento Anual",
    website: "Website"
  },
  contact: {
    title: "Contate-nos",
    description: "Estamos sempre em busca de novos membros que queiram se conectar e crescer profissionalmente. Apresente-se e conte-nos sobre sua empresa para que possamos explorar oportunidades de networking e colaboração. Junte-se à nossa rede e expanda seus horizontes profissionais.",
    address: "New York, 94126, United States",
    phone: "+55 62 8196-7528",
    email: "businessgexp@gmail.com",
    name: "Nome",
    emailAddress: "Endereço de Email",
    message: "Mensagem",
    sendMeCopy: "Enviar-me uma cópia desta mensagem",
    send: "Enviar",
  }
};

export default strings;