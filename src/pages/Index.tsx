import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string }>>([
    { command: 'system status', output: '✓ All systems operational\n✓ 99.99% uptime\n✓ 234 servers active' }
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    let output = '';

    switch (command) {
      case 'help':
        output = 'Available commands:\n- deploy [app-name]\n- status\n- servers list\n- clear';
        break;
      case 'status':
        output = '✓ All systems operational\n✓ 99.99% uptime\n✓ 234 servers active\n✓ Load: 45%';
        break;
      case 'servers list':
        output = 'Active servers:\n- us-east-1: ✓ Online\n- eu-west-1: ✓ Online\n- ap-southeast-1: ✓ Online';
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case '':
        return;
      default:
        if (command.startsWith('deploy ')) {
          const appName = command.replace('deploy ', '');
          output = `Deploying ${appName}...\n✓ Build successful\n✓ Deployment complete\n→ https://${appName}.cloudhost.dev`;
        } else {
          output = `Command not found: ${command}\nType 'help' for available commands`;
        }
    }

    setTerminalHistory([...terminalHistory, { command: cmd, output }]);
    setTerminalInput('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  return (
    <div className="min-h-screen bg-[#0F1419] text-white font-body dark">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <nav className="relative border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Cloud" className="text-primary" size={32} />
            <span className="text-2xl font-display font-bold">CloudHost</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">Тарифы</a>
            <a href="#console" className="text-sm hover:text-primary transition-colors">Консоль</a>
            <Button className="bg-primary hover:bg-primary/90">Начать</Button>
          </div>
        </div>
      </nav>

      <section className="relative container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">Облачная инфраструктура нового поколения</Badge>
          <h1 className="text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent">
            Хостинг будущего уже здесь
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Разворачивайте приложения за секунды. Автоматическое масштабирование, 99.99% uptime и глобальная CDN сеть.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Icon name="Rocket" className="mr-2" size={20} />
              Запустить проект
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
              Посмотреть демо
            </Button>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <Card className="bg-card/50 backdrop-blur border-white/10 p-6 hover:border-primary/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Icon name="Zap" className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Мгновенный деплой</h3>
            <p className="text-gray-400">Разворачивайте приложения за 30 секунд с автоматической оптимизацией</p>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-white/10 p-6 hover:border-primary/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Icon name="Globe" className="text-secondary" size={24} />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Глобальная сеть</h3>
            <p className="text-gray-400">234 точки присутствия по всему миру для минимальной задержки</p>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-white/10 p-6 hover:border-primary/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Icon name="Shield" className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Безопасность</h3>
            <p className="text-gray-400">DDoS защита, SSL сертификаты и изоляция контейнеров из коробки</p>
          </Card>
        </div>
      </section>

      <section id="pricing" className="relative container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4">Прозрачные тарифы</h2>
          <p className="text-gray-400">Платите только за то, что используете</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-card/50 backdrop-blur border-white/10 p-8 hover:border-primary/50 transition-all">
            <h3 className="text-2xl font-display font-bold mb-2">Starter</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$5</span>
              <span className="text-gray-400">/месяц</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>1 vCPU</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>512 MB RAM</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>10 GB SSD</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>100 GB трафика</span>
              </li>
            </ul>
            <Button className="w-full" variant="outline">Выбрать</Button>
          </Card>

          <Card className="bg-gradient-to-b from-primary/20 to-card/50 backdrop-blur border-primary/50 p-8 hover:border-primary transition-all scale-105 relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">Популярный</Badge>
            <h3 className="text-2xl font-display font-bold mb-2">Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$25</span>
              <span className="text-gray-400">/месяц</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>4 vCPU</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>4 GB RAM</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>100 GB SSD</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>1 TB трафика</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>Приоритетная поддержка</span>
              </li>
            </ul>
            <Button className="w-full bg-primary hover:bg-primary/90">Выбрать</Button>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-white/10 p-8 hover:border-primary/50 transition-all">
            <h3 className="text-2xl font-display font-bold mb-2">Enterprise</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$99</span>
              <span className="text-gray-400">/месяц</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>16 vCPU</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>16 GB RAM</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>500 GB SSD</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>10 TB трафика</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={20} />
                <span>Выделенная поддержка 24/7</span>
              </li>
            </ul>
            <Button className="w-full" variant="outline">Связаться</Button>
          </Card>
        </div>
      </section>

      <section id="console" className="relative container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4">Облачная консоль</h2>
          <p className="text-gray-400">Управляйте инфраструктурой через терминал</p>
        </div>

        <Card className="max-w-4xl mx-auto bg-[#0D1117] border-white/10 p-0 overflow-hidden">
          <div className="bg-[#161B22] px-4 py-2 flex items-center gap-2 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-gray-400 ml-4 font-mono">cloudhost-terminal</span>
          </div>

          <div 
            ref={terminalRef}
            className="p-4 font-mono text-sm h-96 overflow-y-auto custom-scrollbar"
          >
            {terminalHistory.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center gap-2 text-primary">
                  <span>$</span>
                  <span>{item.command}</span>
                </div>
                <pre className="text-gray-300 mt-1 whitespace-pre-wrap">{item.output}</pre>
              </div>
            ))}
            
            <div className="flex items-center gap-2">
              <span className="text-primary">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCommand(terminalInput);
                  }
                }}
                className="flex-1 bg-transparent outline-none text-gray-300"
                placeholder="type 'help' for commands"
                autoFocus
              />
            </div>
          </div>

          <div className="bg-[#161B22] px-4 py-2 border-t border-white/10 flex gap-4 text-xs text-gray-400">
            <span>Команды: help, status, deploy, servers list, clear</span>
          </div>
        </Card>
      </section>

      <section className="relative container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4">Архитектура инфраструктуры</h2>
          <p className="text-gray-400">Визуализация серверной сети в реальном времени</p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/50 flex items-center justify-center animate-pulse-glow">
                  <Icon name="Server" className="text-primary" size={40} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
              </div>
              <div className="text-center">
                <p className="font-semibold">US East</p>
                <p className="text-xs text-gray-400">45ms latency</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border-2 border-secondary/50 flex items-center justify-center animate-float">
                  <Icon name="Cloud" className="text-secondary" size={48} />
                </div>
                <Badge className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-secondary/20 text-secondary border-secondary/30 text-xs">
                  Load Balancer
                </Badge>
              </div>
              <div className="text-center">
                <p className="font-semibold">Cloud Core</p>
                <p className="text-xs text-gray-400">234 nodes active</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/50 flex items-center justify-center animate-pulse-glow" style={{ animationDelay: '0.5s' }}>
                  <Icon name="Server" className="text-primary" size={40} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
              </div>
              <div className="text-center">
                <p className="font-semibold">EU West</p>
                <p className="text-xs text-gray-400">32ms latency</p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                  <Icon name="Database" className="text-primary" size={32} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold">Database</p>
                <p className="text-xs text-gray-400">PostgreSQL</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                  <Icon name="HardDrive" className="text-primary" size={32} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold">Storage</p>
                <p className="text-xs text-gray-400">S3 Compatible</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                  <Icon name="Shield" className="text-primary" size={32} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold">Security</p>
                <p className="text-xs text-gray-400">WAF + DDoS</p>
              </div>
            </div>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '0', left: '0' }}>
            <line x1="50%" y1="20%" x2="16.66%" y2="40%" stroke="url(#gradient1)" strokeWidth="2" opacity="0.3" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
            </line>
            <line x1="50%" y1="20%" x2="83.33%" y2="40%" stroke="url(#gradient1)" strokeWidth="2" opacity="0.3" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
            </line>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0" />
                <stop offset="50%" stopColor="#0EA5E9" stopOpacity="1" />
                <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Card className="bg-card/50 backdrop-blur border-white/10 p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-1">99.99%</div>
            <div className="text-sm text-gray-400">Uptime</div>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-white/10 p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-1">234</div>
            <div className="text-sm text-gray-400">Active Servers</div>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-white/10 p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-1">28ms</div>
            <div className="text-sm text-gray-400">Avg Latency</div>
          </Card>
        </div>
      </section>

      <footer className="relative border-t border-white/10 py-12">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© 2024 CloudHost. Облачная инфраструктура нового поколения</p>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(14, 165, 233, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(14, 165, 233, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Index;
