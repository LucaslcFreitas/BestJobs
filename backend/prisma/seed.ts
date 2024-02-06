import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const study_areas = await prisma.study_area.createMany({
        data: [
            { name: 'Ciências Exatas e da Terra' },
            { name: 'Ciências Biológicas' },
            { name: 'Engenharia/Tecnologia' },
            { name: 'Ciências da Saúde' },
            { name: 'Ciências Agrárias' },
            { name: 'Ciências Sociais' },
            { name: 'Ciências Humanas' },
            { name: 'Lingüística' },
            { name: 'Letras e Artes' },
        ],
    });
    const sector_ad = await prisma.sector.create({
        data: {
            name: 'Administração',
            Skil: {
                create: [
                    { name: 'Planejamento Estratégico' },
                    { name: 'Tomada de Decisões' },
                    { name: 'Governança Corporativa' },
                    { name: 'Análise SWOT' },
                    { name: 'Análise PESTEL' },
                    { name: 'Técnicas de Negociação' },
                    { name: 'Resolução de Conflitos' },
                    { name: 'Mediação' },
                    { name: 'Habilidades de Liderança' },
                    { name: 'Motivação de Equipes' },
                    { name: 'Desenvolvimento de Liderança' },
                    { name: 'Sustentabilidade Corporativa' },
                    { name: 'ERP' },
                    { name: 'Empreendedorismo corporativo' },
                    { name: 'Automação de Processos' },
                    { name: 'Business Intelligence' },
                    { name: 'PMI' },
                    { name: 'Prince2' },
                    { name: 'Microsoft Project' },
                    { name: 'Excel' },
                    { name: 'Microsoft Word' },
                ],
            },
        },
    });
    const sector_rh = await prisma.sector.create({
        data: {
            name: 'Recursos Humanos',
            Skil: {
                create: [
                    { name: 'Técnicas de Recrutamento' },
                    { name: 'Entrevistas de Seleção' },
                    { name: 'Avaliação de Candidatos' },
                    { name: 'Avaliação de Desempenho' },
                    { name: 'Definição de Metas e Objetivos' },
                    { name: 'Feedback e Desenvolvimento Profissional' },
                    { name: 'Treinamento' },
                    { name: 'Conhecimento das Leis Trabalhistas' },
                    { name: 'Resolução de Conflitos' },
                    { name: 'Negociação Coletiva' },
                    { name: 'Administração de Benefícios' },
                    { name: 'Pesquisas de Clima Organizacional' },
                    { name: 'Planejamento de Sucessão' },
                    { name: 'HRIS' },
                    { name: 'Estratégias de Comunicação Interna' },
                    { name: 'Confidencialidade de Informações Pessoais' },
                    { name: 'Relatórios de gestão de RH' },
                ],
            },
        },
    });
    const sector_fi = await prisma.sector.create({
        data: {
            name: 'Financeiro',
            Skil: {
                create: [
                    { name: 'Princípios Contábeis' },
                    { name: 'Contabilidade de Custos' },
                    { name: 'Avaliação de Investimentos' },
                    { name: 'Estrutura de Capital' },
                    { name: 'Política de Dividendos' },
                    { name: 'Elaboração de Orçamentos' },
                    { name: 'Análise de Desempenho Financeiro' },
                    { name: 'Gestão de Caixa' },
                    { name: 'Controle de Fluxo de Caixa' },
                    { name: 'Avaliação de Riscos de Crédito' },
                    { name: 'Monitoramento de Inadimplência' },
                    { name: 'Estratégias de Mitigação de Riscos' },
                    { name: 'Projeções Financeiras' },
                    { name: 'Conformidade Tributária' },
                ],
            },
        },
    });
    const sector_mv = await prisma.sector.create({
        data: {
            name: 'Marketing e Vendas',
            Skil: {
                create: [
                    { name: 'Análise de Marcado' },
                    { name: 'Estudo de Tendências' },
                    { name: 'Posicionamento de Marca' },
                    { name: 'Estratégias de Branding' },
                    { name: 'SEO' },
                    { name: 'SEM' },
                    { name: 'Estratégias de Mídia Social' },
                    { name: 'Marketing de Conteúdo' },
                    { name: 'Gestão de Leads' },
                    { name: 'Nurturing de Leads' },
                    { name: 'Campanhas Publicitárias' },
                    { name: 'Compra de Mídia' },
                    { name: 'Comunicação Corporativa' },
                    { name: 'Habilidades de Negociação' },
                    { name: 'Gestão de Objeções' },
                    { name: 'Construção de Relacionamentos' },
                    { name: 'Gestão de Contas' },
                    { name: 'CRM' },
                    { name: 'ROI de Marketing' },
                ],
            },
        },
    });
    const sector_lo = await prisma.sector.create({
        data: {
            name: 'Logística',
            Skil: {
                create: [
                    { name: 'Cadeia de Suprimentos' },
                    { name: 'Otimização de Processos' },
                    { name: 'Controle de Estoque' },
                    { name: 'Gestão de Inventário' },
                    { name: 'Redução de Custos' },
                    { name: 'Modos de Transporte' },
                    { name: 'Gestão de Frota' },
                    { name: 'Programação de Entregas' },
                    { name: 'Sistemas de Picking e Packing' },
                    { name: 'WMS' },
                    { name: 'Rastreamento de Cargas' },
                    { name: 'RFID' },
                    { name: 'Devoluções e Produtos' },
                    { name: 'Planejamento de Contingência' },
                    { name: 'Gestão de Prazos' },
                    { name: 'KPIs' },
                    { name: 'Eficiência energética' },
                ],
            },
        },
    });
    const sector_ti = await prisma.sector.create({
        data: {
            name: 'Tecnologia da Informação',
            Skil: {
                create: [
                    { name: 'Java' },
                    { name: 'Python' },
                    { name: 'C++' },
                    { name: 'C#' },
                    { name: 'JavaScript' },
                    { name: 'Ruby' },
                    { name: 'Django' },
                    { name: 'Ruby on Rails' },
                    { name: 'Spring' },
                    { name: 'Angular' },
                    { name: 'React' },
                    { name: 'Agile' },
                    { name: 'Scrum' },
                    { name: 'DevOps' },
                    { name: 'Git' },
                    { name: 'GitHub' },
                    { name: 'MySQL' },
                    { name: 'PostgreSQL' },
                    { name: 'Oracle' },
                    { name: 'MongoDB' },
                    { name: 'SQL' },
                    { name: 'Administração de Redes' },
                    { name: 'Segurança de Redes' },
                    { name: 'Criptografia' },
                    { name: 'Prevenção de Intrusões' },
                    { name: 'Pentesting' },
                    { name: 'AWS' },
                    { name: 'Azure' },
                    { name: 'Docker' },
                    { name: 'Linux' },
                    { name: 'IA' },
                    { name: 'TensorFlow' },
                    { name: 'PyTorch' },
                    { name: 'HTML' },
                    { name: 'CSS' },
                    { name: 'JavaScript' },
                    { name: 'REST' },
                    { name: 'GraphQL' },
                    { name: 'Apache' },
                    { name: 'Jira' },
                    { name: 'Trello' },
                    { name: 'Android' },
                    { name: 'iOS' },
                    { name: 'Swift' },
                    { name: 'Kotlin' },
                    { name: 'Bash' },
                    { name: 'PowerShell' },
                    { name: 'Power BI' },
                    { name: 'Unity' },
                    { name: 'Unreal Engine' },
                    { name: 'APIs' },
                ],
            },
        },
    });
    const sector_ac = await prisma.sector.create({
        data: {
            name: 'Atendimento ao Cliente',
            Skil: {
                create: [
                    { name: 'Habilidades de Comunicação' },
                    { name: 'Empatia e Compreensão' },
                    { name: 'CRM' },
                    { name: 'Respostas a E-mails' },
                    { name: 'Chat Online ' },
                    { name: 'Identificação de Problemas' },
                    { name: 'Desenvolvimento de Soluções' },
                    { name: 'Acompanhamento Pós-resolução' },
                    { name: 'Cumprimento de Prazos' },
                    { name: 'Criação de Experiências' },
                    { name: 'Coleta e Análise de Feedback' },
                    { name: 'Gestão de Reclamações' },
                    { name: 'Gestão de Crises' },
                    { name: 'Análise de Desempenho' },
                    { name: 'Cultura de Empoderamento' },
                ],
            },
        },
    });

    const job_types = await prisma.job_type.createMany({
        data: [
            { name: 'Tempo Integral' },
            { name: 'Estágio' },
            { name: 'Prestador de Serviços' },
        ],
    });
    const type_localities = await prisma.type_locality.createMany({
        data: [{ name: 'Romoto' }, { name: 'Presencial' }, { name: 'Híbrido' }],
    });
    console.log({
        study_areas,
        sector_ad,
        sector_rh,
        sector_fi,
        sector_mv,
        sector_lo,
        sector_ti,
        sector_ac,
        job_types,
        type_localities,
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        // process.exit(1);
    });
