export interface Recurso {
  id?: string;
  nome: string; 
  tipo: 'AGUA' | 'ENERGIA' | 'CLIMATIZACAO'; 
  valorAtual: number;
  status: 'OPERACIONAL' | 'ALERTA' | 'CRITICO';
}
