const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const users = [
  { id: 1, email: 'admin@siteguard.com', password: 'admin123', role: 'admin' },
  { id: 2, email: 'user@siteguard.com', password: 'user123', role: 'user' }
];

const monitors = [
  {
    id: 1,
    name: 'Main Website',
    url: 'https://example.com',
    status: 'up',
    uptime: 99.9,
    responseTime: 125,
    lastCheck: new Date().toISOString()
  },
  {
    id: 2,
    name: 'API Service',
    url: 'https://api.example.com',
    status: 'up',
    uptime: 99.8,
    responseTime: 85,
    lastCheck: new Date().toISOString()
  }
];

const alerts = [
  {
    id: 1,
    title: 'High CPU Usage',
    message: 'CPU usage exceeded 90% threshold',
    severity: 'high',
    status: 'active',
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Database Connection Pool Exhausted',
    message: 'Connection pool reached maximum capacity',
    severity: 'critical',
    status: 'resolved',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // Simple token validation (in production, use JWT)
  if (token === 'valid-token') {
    next();
  } else {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Authentication
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({
      success: true,
      user: { id: user.id, email: user.email, role: user.role },
      token: 'valid-token'
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'User already exists' });
  }
  
  const newUser = {
    id: users.length + 1,
    email,
    password,
    role: 'user'
  };
  
  users.push(newUser);
  
  res.json({
    success: true,
    user: { id: newUser.id, email: newUser.email, role: newUser.role },
    token: 'valid-token'
  });
});

// Monitors
app.get('/api/monitors', authenticateToken, (req, res) => {
  res.json(monitors);
});

app.post('/api/monitors', authenticateToken, (req, res) => {
  const { name, url } = req.body;
  
  if (!name || !url) {
    return res.status(400).json({ error: 'Name and URL required' });
  }
  
  const newMonitor = {
    id: monitors.length + 1,
    name,
    url,
    status: 'up',
    uptime: 100,
    responseTime: 0,
    lastCheck: new Date().toISOString()
  };
  
  monitors.push(newMonitor);
  res.json(newMonitor);
});

// Alerts
app.get('/api/alerts', authenticateToken, (req, res) => {
  res.json(alerts);
});

// Chaos Experiments
app.get('/api/chaos-experiments', authenticateToken, (req, res) => {
  const experiments = [
    {
      id: '1',
      name: 'Network Latency Test',
      description: 'Simulate network latency to test application resilience',
      status: 'running',
      type: 'network',
      severity: 'medium',
      duration: 300,
      progress: 65,
      startTime: '2024-01-15T10:30:00Z',
      results: {
        servicesAffected: 2,
        recoveryTime: 45,
        impact: 'Minimal'
      }
    },
    {
      id: '2',
      name: 'CPU Stress Test',
      description: 'High CPU load simulation to test autoscaling',
      status: 'completed',
      type: 'cpu',
      severity: 'high',
      duration: 600,
      progress: 100,
      startTime: '2024-01-15T09:00:00Z',
      endTime: '2024-01-15T09:10:00Z',
      results: {
        servicesAffected: 5,
        recoveryTime: 120,
        impact: 'Moderate'
      }
    }
  ];
  
  res.json(experiments);
});

// AI Insights
app.get('/api/ai-insights', authenticateToken, (req, res) => {
  const insights = [
    {
      id: '1',
      title: 'Memory Usage Spike Predicted',
      description: 'Based on current trends, memory usage is expected to exceed 85% within 2 hours',
      type: 'prediction',
      severity: 'high',
      confidence: 87,
      status: 'active',
      timestamp: '2024-01-15T10:30:00Z',
      impact: 'Potential service degradation',
      action: 'Consider scaling up memory allocation',
      trend: 'up',
      value: 78,
      unit: '%'
    },
    {
      id: '2',
      title: 'Database Connection Pool Optimization',
      description: 'Current connection pool settings are suboptimal for your traffic patterns',
      type: 'optimization',
      severity: 'medium',
      confidence: 92,
      status: 'pending',
      timestamp: '2024-01-15T09:15:00Z',
      impact: 'Improved response times',
      action: 'Increase max_connections from 50 to 100',
      trend: 'up',
      value: 45,
      unit: 'ms'
    }
  ];
  
  res.json(insights);
});

// Dashboard metrics
app.get('/api/dashboard/metrics', authenticateToken, (req, res) => {
  const metrics = {
    uptime: 99.9,
    activeMonitors: monitors.length,
    threatsBlocked: 847,
    avgResponseTime: 125,
    totalRequests: 2400000,
    errorRate: 0.02,
    securityScore: 'A+'
  };
  
  res.json(metrics);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 SiteGuard API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth endpoints: /api/auth/login, /api/auth/register`);
  console.log(`📈 Monitor endpoints: /api/monitors`);
  console.log(`⚠️  Alert endpoints: /api/alerts`);
  console.log(`🧪 Chaos experiments: /api/chaos-experiments`);
  console.log(`🤖 AI insights: /api/ai-insights`);
}); 