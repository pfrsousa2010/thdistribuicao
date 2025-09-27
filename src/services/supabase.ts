import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ckbpucxltrskhvfwgxqc.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrYnB1Y3hsdHJza2h2ZndneHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDQxODAsImV4cCI6MjA3NDM4MDE4MH0.2-AAN_8R4jjZv7yBcZHK48k1XDc8orYW0Trb_hNG1iE'

// Validação das configurações
if (!supabaseUrl || !supabaseKey) {
  console.error('Configurações do Supabase não encontradas. Verifique as variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
