import { Clock, Wrench, type LucideIcon } from 'lucide-react';

/** Ícones disponíveis para o campo `icone` de cada ferramenta. Importe novos aqui. */
const icones: Record<string, LucideIcon> = { Clock, Wrench };

export const iconeDa = (nome: string): LucideIcon => icones[nome] ?? Wrench;
