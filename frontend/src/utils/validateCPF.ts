const isCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let accumulator = 0;
    let rest;

    for (let i = 1; i <= 9; i++) {
        accumulator += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }

    rest = (accumulator * 10) % 11;

    if (rest === 10 || rest === 11) {
        rest = 0;
    }

    if (rest !== parseInt(cpf.charAt(9))) {
        return false;
    }

    accumulator = 0;

    for (let i = 1; i <= 10; i++) {
        accumulator += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }

    rest = (accumulator * 10) % 11;

    if (rest === 10 || rest === 11) {
        rest = 0;
    }

    if (rest !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
}

const formatCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, '');

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export { isCPF, formatCPF };
