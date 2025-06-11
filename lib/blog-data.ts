export interface Author {
    id: string
    name: string
    role: string
    bio: string
    image: string
    social: {
      twitter?: string
      linkedin?: string
      github?: string
    }
  }
  
  export interface BlogPost {
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    coverImage: string
    detailImage: string
    date: string
    readingTime: string
    category: string
    tags: string[]
    author: Author
    featured?: boolean
  }
  
  export const authors: Author[] = [
    {
      id: "author-1",
      name: "Alex Morgan",
      role: "Senior Developer",
      bio: "Alex has over 10 years of experience in web development and specializes in React and Next.js. He loves sharing his knowledge through writing and speaking at conferences.",
      image: "/images/blog/author-1.jpg",
      social: {
        twitter: "https://twitter.com/alexmorgan",
        linkedin: "https://linkedin.com/in/alexmorgan",
        github: "https://github.com/alexmorgan",
      },
    },
    {
      id: "author-2",
      name: "Sarah Johnson",
      role: "UX Designer",
      bio: "Sarah is a UX designer with a passion for creating beautiful and functional user experiences. She has worked with numerous startups and enterprise clients.",
      image: "/images/blog/author-2.jpg",
      social: {
        twitter: "https://twitter.com/sarahjohnson",
        linkedin: "https://linkedin.com/in/sarahjohnson",
      },
    },
    {
      id: "author-3",
      name: "Michael Chen",
      role: "Tech Lead",
      bio: "Michael leads our technical team and has extensive experience in system architecture and performance optimization. He enjoys solving complex technical challenges.",
      image: "/images/blog/author-3.jpg",
      social: {
        twitter: "https://twitter.com/michaelchen",
        linkedin: "https://linkedin.com/in/michaelchen",
        github: "https://github.com/michaelchen",
      },
    },
  ]
  
  export const blogPosts: BlogPost[] = [
    {
      id: "1",
      slug: "the-future-of-web-development",
      title: "The Future of Web Development: Trends to Watch in 2025",
      excerpt:
        "Explore the emerging technologies and methodologies that will shape web development in the coming years, from AI integration to new frameworks.",
      content: `
        <p>The web development landscape is constantly evolving, with new technologies, frameworks, and methodologies emerging at a rapid pace. As we look ahead to 2025, several key trends are poised to reshape how we build and interact with web applications.</p>
  
        <h2>AI-Powered Development Tools</h2>
        <p>Artificial intelligence is no longer just a buzzword—it's becoming an integral part of the development process. AI-powered tools are now capable of:</p>
        <ul>
          <li>Generating code based on natural language descriptions</li>
          <li>Identifying bugs and suggesting fixes before deployment</li>
          <li>Optimizing performance based on user behavior patterns</li>
          <li>Creating personalized user experiences at scale</li>
        </ul>
        <p>These capabilities are dramatically increasing developer productivity while reducing the time from concept to deployment.</p>
  
        <h2>WebAssembly Goes Mainstream</h2>
        <p>WebAssembly (Wasm) has been gaining traction, but in the next few years, we expect it to become a standard part of web development. This technology allows code written in languages like C++, Rust, and Go to run in the browser at near-native speed.</p>
        <p>The implications are significant: complex applications that once required native code can now run efficiently in the browser, opening up new possibilities for web-based gaming, video editing, 3D rendering, and more.</p>
  
        <h2>Edge Computing Transforms Architecture</h2>
        <p>The rise of edge computing is changing how we think about application architecture. Instead of centralizing processing in cloud data centers, computation is moving closer to the end user, resulting in:</p>
        <ul>
          <li>Dramatically reduced latency</li>
          <li>Improved performance for users worldwide</li>
          <li>Better reliability even with intermittent connectivity</li>
          <li>Reduced bandwidth costs</li>
        </ul>
        <p>Frameworks like Next.js are already embracing this shift with edge runtime support, and we expect this trend to accelerate.</p>
  
        <h2>Micro-Frontends for Complex Applications</h2>
        <p>As web applications grow in complexity, more teams are adopting micro-frontend architectures. This approach applies microservice principles to frontend development, allowing:</p>
        <ul>
          <li>Independent teams to work on different parts of an application</li>
          <li>Incremental upgrades to large applications</li>
          <li>Technology diversity within a single application</li>
          <li>More resilient applications where failures are isolated</li>
        </ul>
        <p>While this approach adds some complexity, the benefits for large teams and applications are becoming increasingly clear.</p>
  
        <h2>Sustainability in Web Development</h2>
        <p>With growing awareness of technology's environmental impact, sustainable web development practices are gaining importance. Developers are now considering:</p>
        <ul>
          <li>Energy efficiency of their applications</li>
          <li>Optimizing assets to reduce data transfer</li>
          <li>Server locations and energy sources</li>
          <li>Hardware lifecycle management</li>
        </ul>
        <p>We expect to see more tools and metrics focused on measuring and improving the carbon footprint of web applications.</p>
  
        <h2>Conclusion</h2>
        <p>The future of web development is exciting, with technologies that will make applications faster, more capable, and more accessible. Developers who stay ahead of these trends will be well-positioned to create the next generation of web experiences that delight users while addressing the technical and environmental challenges of our time.</p>
      `,
      coverImage: "/images/blog/blog-1.jpg",
      detailImage: "/images/blog/blog-detail-1.jpg",
      date: "April 15, 2025",
      readingTime: "8 min read",
      category: "Technology",
      tags: ["Web Development", "AI", "WebAssembly", "Edge Computing"],
      author: authors[0],
      featured: true,
    },
    {
      id: "2",
      slug: "designing-for-accessibility",
      title: "Designing for Accessibility: Best Practices for Inclusive Web Experiences",
      excerpt:
        "Learn how to create web experiences that are accessible to all users, including those with disabilities, and why it matters for your business.",
      content: `
        <p>Creating accessible websites isn't just the right thing to do—it's essential for reaching a wider audience and often required by law. In this article, we'll explore practical approaches to designing with accessibility in mind.</p>
  
        <h2>Understanding Web Accessibility</h2>
        <p>Web accessibility means designing and developing websites that people with disabilities can use effectively. This includes individuals with:</p>
        <ul>
          <li>Visual impairments</li>
          <li>Hearing impairments</li>
          <li>Motor limitations</li>
          <li>Cognitive disabilities</li>
          <li>Age-related limitations</li>
        </ul>
        <p>By addressing accessibility, you're not only supporting these users but also improving the experience for everyone.</p>
  
        <h2>Key Principles of Accessible Design</h2>
        <p>The Web Content Accessibility Guidelines (WCAG) provide a framework for accessibility, organized around four principles:</p>
        
        <h3>1. Perceivable</h3>
        <p>Information must be presentable to users in ways they can perceive. This means:</p>
        <ul>
          <li>Providing text alternatives for non-text content</li>
          <li>Creating content that can be presented in different ways</li>
          <li>Making it easier for users to see and hear content</li>
        </ul>
        
        <h3>2. Operable</h3>
        <p>User interface components must be operable by all users. This includes:</p>
        <ul>
          <li>Making all functionality available from a keyboard</li>
          <li>Giving users enough time to read and use content</li>
          <li>Not using content that could cause seizures or physical reactions</li>
          <li>Helping users navigate and find content</li>
        </ul>
        
        <h3>3. Understandable</h3>
        <p>Information and operation of the user interface must be understandable. This means:</p>
        <ul>
          <li>Making text readable and understandable</li>
          <li>Making content appear and operate in predictable ways</li>
          <li>Helping users avoid and correct mistakes</li>
        </ul>
        
        <h3>4. Robust</h3>
        <p>Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies. This requires:</p>
        <ul>
          <li>Maximizing compatibility with current and future tools</li>
          <li>Using standard HTML elements properly</li>
          <li>Providing name, role, and value for non-standard elements</li>
        </ul>
  
        <h2>Practical Implementation Tips</h2>
        
        <h3>Semantic HTML</h3>
        <p>Using the right HTML elements for their intended purpose provides built-in accessibility benefits:</p>
        <ul>
          <li>Use heading tags (h1-h6) to create a logical document structure</li>
          <li>Use button elements for clickable actions</li>
          <li>Use label elements to associate text with form controls</li>
          <li>Use nav, main, article, and other semantic elements to define page structure</li>
        </ul>
        
        <h3>Color and Contrast</h3>
        <p>Color choices significantly impact accessibility:</p>
        <ul>
          <li>Ensure sufficient contrast between text and background (WCAG recommends a ratio of at least 4.5:1 for normal text)</li>
          <li>Don't rely on color alone to convey information</li>
          <li>Consider how your design appears to users with color blindness</li>
        </ul>
        
        <h3>Keyboard Navigation</h3>
        <p>Many users rely on keyboards or keyboard alternatives:</p>
        <ul>
          <li>Ensure all interactive elements are keyboard accessible</li>
          <li>Maintain a logical tab order</li>
          <li>Provide visible focus indicators</li>
          <li>Create keyboard shortcuts for common actions</li>
        </ul>
        
        <h3>Images and Media</h3>
        <p>Make visual and audio content accessible:</p>
        <ul>
          <li>Add alt text to images that convey information</li>
          <li>Provide transcripts and captions for audio and video content</li>
          <li>Ensure media controls are accessible</li>
        </ul>
  
        <h2>Testing for Accessibility</h2>
        <p>Regular testing is crucial for maintaining accessibility:</p>
        <ul>
          <li>Use automated tools like Lighthouse, axe, or WAVE</li>
          <li>Test with keyboard navigation only</li>
          <li>Test with screen readers like NVDA, JAWS, or VoiceOver</li>
          <li>Conduct user testing with people who have disabilities</li>
        </ul>
  
        <h2>Conclusion</h2>
        <p>Designing for accessibility is an ongoing process that should be integrated into your development workflow. By following these best practices, you'll create web experiences that are more inclusive, reach a wider audience, and often provide a better experience for all users.</p>
        
        <p>Remember that accessibility isn't just about compliance—it's about ensuring that everyone, regardless of their abilities, can access and enjoy the web.</p>
      `,
      coverImage: "/images/blog/blog-2.jpg",
      detailImage: "/images/blog/blog-detail-2.jpg",
      date: "April 10, 2025",
      readingTime: "10 min read",
      category: "Design",
      tags: ["Accessibility", "UX Design", "Inclusive Design", "WCAG"],
      author: authors[1],
    },
    {
      id: "3",
      slug: "optimizing-website-performance",
      title: "Optimizing Website Performance: Strategies for Lightning-Fast Load Times",
      excerpt:
        "Discover proven techniques to improve your website's performance, from code optimization to advanced caching strategies.",
      content: `
        <p>In today's fast-paced digital world, website performance isn't just a technical consideration—it's a critical business factor. Users expect websites to load quickly, and even small delays can lead to increased bounce rates and lost conversions.</p>
  
        <h2>Why Performance Matters</h2>
        <p>Before diving into optimization techniques, let's understand why performance is so crucial:</p>
        <ul>
          <li><strong>User Experience:</strong> 53% of mobile users abandon sites that take longer than 3 seconds to load</li>
          <li><strong>Conversion Rates:</strong> A 1-second delay in page load time can result in a 7% reduction in conversions</li>
          <li><strong>SEO:</strong> Page speed is a ranking factor for search engines</li>
          <li><strong>Accessibility:</strong> Fast websites are more accessible to users with slower connections</li>
        </ul>
  
        <h2>Core Web Vitals</h2>
        <p>Google's Core Web Vitals have become the standard metrics for measuring user experience:</p>
        
        <h3>Largest Contentful Paint (LCP)</h3>
        <p>LCP measures loading performance—how quickly the largest content element becomes visible. For a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.</p>
        
        <h3>First Input Delay (FID)</h3>
        <p>FID measures interactivity—the time from when a user first interacts with your page to when the browser can respond. A good FID score is less than 100 milliseconds.</p>
        
        <h3>Cumulative Layout Shift (CLS)</h3>
        <p>CLS measures visual stability—how much elements move around as the page loads. A good CLS score is less than 0.1.</p>
  
        <h2>Optimization Strategies</h2>
        
        <h3>1. Optimize Images</h3>
        <p>Images often account for the majority of a page's weight:</p>
        <ul>
          <li>Use modern formats like WebP or AVIF</li>
          <li>Implement responsive images with srcset</li>
          <li>Lazy load images below the fold</li>
          <li>Properly size images (don't use a 2000px image in a 400px container)</li>
          <li>Compress images without significant quality loss</li>
        </ul>
        
        <h3>2. Minimize HTTP Requests</h3>
        <p>Each resource your page requests adds loading time:</p>
        <ul>
          <li>Combine CSS and JavaScript files</li>
          <li>Use CSS sprites for small, frequently used images</li>
          <li>Implement icon fonts or SVGs instead of image files</li>
          <li>Remove unnecessary third-party scripts</li>
        </ul>
        
        <h3>3. Leverage Browser Caching</h3>
        <p>Caching allows returning visitors to load your site more quickly:</p>
        <ul>
          <li>Set appropriate cache headers for different resource types</li>
          <li>Use versioning or fingerprinting for cache busting when resources change</li>
          <li>Implement a service worker for offline capabilities</li>
        </ul>
        
        <h3>4. Optimize JavaScript</h3>
        <p>JavaScript can significantly impact performance:</p>
        <ul>
          <li>Defer non-critical JavaScript</li>
          <li>Use code splitting to load only what's needed</li>
          <li>Minimize and compress JavaScript files</li>
          <li>Consider using Web Workers for CPU-intensive tasks</li>
        </ul>
        
        <h3>5. Implement Content Delivery Networks (CDNs)</h3>
        <p>CDNs distribute your content across multiple locations worldwide:</p>
        <ul>
          <li>Reduces server load</li>
          <li>Decreases latency for users far from your origin server</li>
          <li>Provides additional security benefits</li>
          <li>Often includes optimization features like automatic compression</li>
        </ul>
        
        <h3>6. Optimize CSS</h3>
        <p>CSS affects how quickly your page renders:</p>
        <ul>
          <li>Place critical CSS inline in the head</li>
          <li>Defer non-critical CSS</li>
          <li>Minimize and compress CSS files</li>
          <li>Remove unused CSS</li>
        </ul>
        
        <h3>7. Implement Server-Side Optimizations</h3>
        <p>Backend optimizations can significantly improve performance:</p>
        <ul>
          <li>Enable GZIP or Brotli compression</li>
          <li>Implement server-side caching</li>
          <li>Optimize database queries</li>
          <li>Consider using a faster hosting solution</li>
        </ul>
  
        <h2>Advanced Techniques</h2>
        
        <h3>Preloading and Prefetching</h3>
        <p>These techniques anticipate user actions:</p>
        <ul>
          <li><strong>Preload:</strong> Load critical resources earlier in the page lifecycle</li>
          <li><strong>Prefetch:</strong> Load resources that might be needed for subsequent pages</li>
          <li><strong>Preconnect:</strong> Establish early connections to important third-party domains</li>
        </ul>
        
        <h3>Intersection Observer</h3>
        <p>This API allows you to efficiently detect when elements enter the viewport, enabling more efficient:</p>
        <ul>
          <li>Lazy loading of images and videos</li>
          <li>Infinite scrolling implementations</li>
          <li>Animation triggering</li>
        </ul>
        
        <h3>Next-Gen Rendering Patterns</h3>
        <p>Modern frameworks offer various rendering strategies:</p>
        <ul>
          <li>Server-Side Rendering (SSR) for improved initial load</li>
          <li>Static Site Generation (SSG) for maximum performance</li>
          <li>Incremental Static Regeneration (ISR) for dynamic content with static benefits</li>
          <li>Streaming SSR for progressive rendering</li>
        </ul>
  
        <h2>Measuring Performance</h2>
        <p>Regular performance testing is essential:</p>
        <ul>
          <li>Use Lighthouse in Chrome DevTools</li>
          <li>Implement Real User Monitoring (RUM)</li>
          <li>Test from multiple locations and device types</li>
          <li>Set up performance budgets and monitoring</li>
        </ul>
  
        <h2>Conclusion</h2>
        <p>Website performance optimization is an ongoing process, not a one-time task. By implementing these strategies and regularly measuring your results, you can create lightning-fast experiences that delight users and improve business outcomes.</p>
        
        <p>Remember that performance optimization often involves trade-offs—focus on improvements that will have the biggest impact for your specific audience and use case.</p>
      `,
      coverImage: "/images/blog/blog-3.jpg",
      detailImage: "/images/blog/blog-detail-3.jpg",
      date: "April 5, 2025",
      readingTime: "12 min read",
      category: "Performance",
      tags: ["Web Performance", "Optimization", "Core Web Vitals", "Speed"],
      author: authors[2],
      featured: true,
    },
    {
      id: "4",
      slug: "building-scalable-applications",
      title: "Building Scalable Applications: Architecture Patterns for Growth",
      excerpt:
        "Learn how to design and build applications that can scale effectively as your user base and feature set grow over time.",
      content: `
        <p>Scalability—the ability of a system to handle growing amounts of work—is a critical consideration when building modern applications. In this article, we'll explore architectural patterns and practices that enable applications to scale effectively.</p>
  
        <h2>Understanding Scalability</h2>
        <p>Scalability comes in different forms:</p>
        <ul>
          <li><strong>Vertical Scaling (Scaling Up):</strong> Adding more resources (CPU, RAM) to existing servers</li>
          <li><strong>Horizontal Scaling (Scaling Out):</strong> Adding more servers to distribute the load</li>
          <li><strong>Functional Scaling:</strong> Breaking an application into functional components that can scale independently</li>
        </ul>
        <p>A truly scalable application typically leverages all three approaches, with an emphasis on horizontal and functional scaling for maximum flexibility.</p>
  
        <h2>Architectural Patterns for Scalability</h2>
        
        <h3>1. Microservices Architecture</h3>
        <p>Microservices break applications into small, independent services that:</p>
        <ul>
          <li>Can be developed, deployed, and scaled independently</li>
          <li>Are organized around business capabilities</li>
          <li>Can use different technologies as appropriate</li>
          <li>Communicate through well-defined APIs</li>
        </ul>
        <p>This architecture enables teams to scale specific services based on demand rather than scaling the entire application.</p>
        
        <h3>2. Event-Driven Architecture</h3>
        <p>Event-driven architectures decouple components through events:</p>
        <ul>
          <li>Components emit events when state changes</li>
          <li>Other components subscribe to relevant events</li>
          <li>Event brokers manage distribution</li>
          <li>Components can scale independently based on event volume</li>
        </ul>
        <p>This pattern is particularly effective for systems with unpredictable or bursty workloads.</p>
        
        <h3>3. CQRS (Command Query Responsibility Segregation)</h3>
        <p>CQRS separates read and write operations:</p>
        <ul>
          <li>Commands handle state changes (writes)</li>
          <li>Queries handle data retrieval (reads)</li>
          <li>Different data models can be used for each</li>
          <li>Read and write workloads can scale independently</li>
        </ul>
        <p>This pattern is valuable when read and write workloads have different scaling requirements or performance characteristics.</p>
        
        <h3>4. API Gateway Pattern</h3>
        <p>An API Gateway serves as a single entry point for clients:</p>
        <ul>
          <li>Routes requests to appropriate services</li>
          <li>Handles cross-cutting concerns like authentication</li>
          <li>Can perform request aggregation</li>
          <li>Provides a layer of abstraction between clients and services</li>
        </ul>
        <p>This pattern simplifies client interactions while allowing backend services to evolve independently.</p>
  
        <h2>Database Scalability Strategies</h2>
        
        <h3>1. Database Sharding</h3>
        <p>Sharding partitions data across multiple database instances:</p>
        <ul>
          <li>Distributes data based on a partition key</li>
          <li>Reduces the load on any single database instance</li>
          <li>Allows for horizontal scaling of database capacity</li>
          <li>Complicates queries that span multiple shards</li>
        </ul>
        
        <h3>2. Read Replicas</h3>
        <p>Read replicas provide additional copies of data for read operations:</p>
        <ul>
          <li>Primary database handles writes</li>
          <li>Replicas handle read queries</li>
          <li>Improves read performance and availability</li>
          <li>Introduces potential consistency challenges</li>
        </ul>
        
        <h3>3. Polyglot Persistence</h3>
        <p>Different data storage technologies for different types of data:</p>
        <ul>
          <li>Relational databases for structured data with complex relationships</li>
          <li>Document databases for semi-structured data</li>
          <li>Key-value stores for simple, high-throughput data</li>
          <li>Graph databases for highly connected data</li>
        </ul>
        <p>This approach allows you to choose the right tool for each data storage requirement.</p>
        
        <h3>4. Caching Strategies</h3>
        <p>Caching reduces database load and improves response times:</p>
        <ul>
          <li>Application-level caching</li>
          <li>Distributed caching with tools like Redis</li>
          <li>Content Delivery Networks (CDNs) for static assets</li>
          <li>Cache invalidation strategies to maintain consistency</li>
        </ul>
  
        <h2>Infrastructure Considerations</h2>
        
        <h3>1. Containerization and Orchestration</h3>
        <p>Containers provide consistency and portability:</p>
        <ul>
          <li>Package applications with dependencies</li>
          <li>Enable consistent deployment across environments</li>
          <li>Orchestration tools like Kubernetes manage scaling</li>
          <li>Support auto-scaling based on demand</li>
        </ul>
        
        <h3>2. Cloud-Native Architecture</h3>
        <p>Cloud-native approaches leverage cloud capabilities:</p>
        <ul>
          <li>Managed services reduce operational overhead</li>
          <li>Serverless computing for automatic scaling</li>
          <li>Infrastructure as Code (IaC) for reproducible environments</li>
          <li>Multi-region deployment for global availability</li>
        </ul>
        
        <h3>3. Resilience Patterns</h3>
        <p>Resilience is crucial for scalable systems:</p>
        <ul>
          <li>Circuit breakers prevent cascading failures</li>
          <li>Bulkheads isolate failures</li>
          <li>Retry policies handle transient failures</li>
          <li>Fallbacks provide degraded functionality when services fail</li>
        </ul>
  
        <h2>Development Practices for Scalability</h2>
        
        <h3>1. Asynchronous Processing</h3>
        <p>Asynchronous operations improve responsiveness and throughput:</p>
        <ul>
          <li>Background job processing for time-consuming tasks</li>
          <li>Message queues for workload distribution</li>
          <li>Webhooks for event notifications</li>
          <li>Scheduled tasks for periodic processing</li>
        </ul>
        
        <h3>2. Statelessness</h3>
        <p>Stateless components are easier to scale:</p>
        <ul>
          <li>Store state externally (databases, caches)</li>
          <li>Use tokens for authentication instead of sessions</li>
          <li>Enable any instance to handle any request</li>
          <li>Simplifies load balancing and failover</li>
        </ul>
        
        <h3>3. Feature Flags</h3>
        <p>Feature flags provide control over functionality:</p>
        <ul>
          <li>Gradually roll out features to subsets of users</li>
          <li>A/B test different implementations</li>
          <li>Quickly disable problematic features</li>
          <li>Manage load during peak periods</li>
        </ul>
  
        <h2>Monitoring and Observability</h2>
        <p>As systems scale, visibility becomes crucial:</p>
        <ul>
          <li>Distributed tracing to follow requests across services</li>
          <li>Centralized logging for troubleshooting</li>
          <li>Metrics for performance and capacity planning</li>
          <li>Alerts for proactive issue detection</li>
        </ul>
  
        <h2>Conclusion</h2>
        <p>Building scalable applications requires thoughtful architecture, appropriate technology choices, and disciplined development practices. By applying the patterns and strategies outlined in this article, you can create systems that grow gracefully with your user base and business needs.</p>
        
        <p>Remember that scalability is not just about handling more users—it's also about maintaining performance, reliability, and developer productivity as your application evolves.</p>
      `,
      coverImage: "/images/blog/blog-4.jpg",
      detailImage: "/images/blog/blog-detail-4.jpg",
      date: "April 1, 2025",
      readingTime: "15 min read",
      category: "Architecture",
      tags: ["Scalability", "System Design", "Microservices", "Cloud Architecture"],
      author: authors[0],
    },
  ]
  
  export function getBlogPosts() {
    return blogPosts
  }
  
  export function getFeaturedPosts() {
    return blogPosts.filter((post) => post.featured)
  }
  
  export function getPostBySlug(slug: string) {
    return blogPosts.find((post) => post.slug === slug)
  }
  
  export function getRelatedPosts(currentPostId: string, limit = 3) {
    return blogPosts.filter((post) => post.id !== currentPostId).slice(0, limit)
  }
  
  export function getPostsByCategory(category: string) {
    return blogPosts.filter((post) => post.category === category)
  }
  
  export function getPostsByTag(tag: string) {
    return blogPosts.filter((post) => post.tags.includes(tag))
  }
  
  export function getCategories() {
    const categories = new Set<string>()
    blogPosts.forEach((post) => categories.add(post.category))
    return Array.from(categories)
  }
  
  export function getTags() {
    const tags = new Set<string>()
    blogPosts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)))
    return Array.from(tags)
  }
  
  export function getAuthorById(id: string) {
    return authors.find((author) => author.id === id)
  }
  
  export function getPostsByAuthor(authorId: string) {
    return blogPosts.filter((post) => post.author.id === authorId)
  }
  