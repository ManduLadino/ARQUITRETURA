import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/50">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/buscarq-logo.png"
                alt="BUSCARQ Logo"
                className="h-10 w-auto hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Conectando clientes a arquitetos de forma rápida e intuitiva, inspirado no modelo Uber.
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} BUSCARQ. <br />
              Desenvolvido por Cezar Marco e guiado por Gil BV.
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Navegação</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-buscarq-yellow transition-colors">
                    Início
                  </Link>
                </li>
                <li>
                  <Link
                    href="#como-funciona"
                    className="text-muted-foreground hover:text-buscarq-yellow transition-colors"
                  >
                    Como Funciona
                  </Link>
                </li>
                <li>
                  <Link href="#recursos" className="text-muted-foreground hover:text-buscarq-yellow transition-colors">
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link href="/projeto" className="text-muted-foreground hover:text-buscarq-yellow transition-colors">
                    Iniciar Projeto
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-buscarq-yellow transition-colors">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-buscarq-yellow transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-buscarq-yellow transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Contato</h3>
              <ul className="space-y-3">
                <li className="text-muted-foreground">contato@buscarq.com</li>
                <li className="text-muted-foreground">+55 (11) 99999-9999</li>
                <li className="text-muted-foreground">São Paulo, SP</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <div className="text-sm text-muted-foreground">BUSCARQ - Todos os direitos reservados</div>
        </div>
      </div>
    </footer>
  )
}
