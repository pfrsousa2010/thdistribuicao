import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ckbpucxltrskhvfwgxqc.supabase.co'
// Substitua pela sua chave anônima do Supabase
const supabaseKey = 'SUA_CHAVE_ANONIMA_AQUI'

export const supabase = createClient(supabaseUrl, supabaseKey)
