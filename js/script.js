// =========================================================
// PORTFOLIO IRÉNÉE ATISSOUSSI - V1
// =========================================================

const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

// --------------------- Menu mobile ---------------------
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

mainNav.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// --------------------- Photo fallback ---------------------
const profileImage = document.getElementById("profileImage");
const portraitFallback = document.getElementById("portraitFallback");

function showImageIfAvailable() {
  if (profileImage.complete && profileImage.naturalWidth > 0) {
    profileImage.style.display = "block";
    portraitFallback.style.display = "none";
  }
}

profileImage.addEventListener("load", showImageIfAvailable);
profileImage.addEventListener("error", () => {
  profileImage.style.display = "none";
  portraitFallback.style.display = "grid";
});
showImageIfAvailable();

// --------------------- Reveal on scroll ---------------------
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));

// --------------------- Back to top ---------------------
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 600);
});

// --------------------- Active nav ---------------------
const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link[href^='#']")];

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const current = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (current) current.classList.add("active");
      }
    });
  },
  { rootMargin: "-42% 0px -45% 0px" }
);

sections.forEach(section => sectionObserver.observe(section));

// --------------------- Animated network background ---------------------
const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");

let nodes = [];
let width = 0;
let height = 0;
let dpr = Math.min(window.devicePixelRatio || 1, 2);

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.max(34, Math.floor((width * height) / 26000));
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    r: Math.random() * 1.8 + 0.8
  }));
}

function drawNetwork() {
  ctx.clearRect(0, 0, width, height);

  // nodes
  for (const node of nodes) {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < -20) node.x = width + 20;
    if (node.x > width + 20) node.x = -20;
    if (node.y < -20) node.y = height + 20;
    if (node.y > height + 20) node.y = -20;

    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(15, 118, 110, 0.28)";
    ctx.fill();
  }

  // lines
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.hypot(dx, dy);

      if (dist < 135) {
        const alpha = (1 - dist / 135) * 0.19;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(15, 118, 110, ${alpha * 0.55})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawNetwork);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawNetwork();


// --------------------- Project modals ---------------------
const modalTriggers = document.querySelectorAll("[data-modal]");
const projectModals = document.querySelectorAll(".project-modal");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");

function openProjectModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProjectModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

modalTriggers.forEach(trigger => {
  trigger.addEventListener("click", () => {
    openProjectModal(trigger.dataset.modal);
  });
});

closeModalButtons.forEach(button => {
  button.addEventListener("click", () => {
    const modal = button.closest(".project-modal");
    if (modal) closeProjectModal(modal);
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    projectModals.forEach(modal => {
      if (modal.classList.contains("open")) closeProjectModal(modal);
    });
  }
});
/* =========================================================
   SYSTEME DE LANGUE FR / EN
   ========================================================= */

const translationsEN = {

  /* ---------- Navigation ---------- */

  "Accueil": "Home",
  "Profil": "Profile",
  "Compétences": "Skills",
  "Projets": "Projects",
  "Parcours": "Background",

  /* ---------- Accueil ---------- */

  "Réseaux · Télécommunications · Systèmes":
    "Networks · Telecommunications · Systems",

  "Ingénieur Réseaux & Télécommunications":
    "Network & Telecommunications Engineer",

  "Ingénieur Réseaux & Télécommunications, diplômé d’un Master en Télécommunications & Multimédia, orienté infrastructures IP, systèmes, sécurité et architectures télécoms modernes.":
    "Network & Telecommunications Engineer with a Master's degree in Telecommunications & Multimedia, specializing in IP infrastructures, systems, security and modern telecommunications architectures.",

  "Je conçois, configure et teste des environnements réseaux et télécoms à travers des projets pratiques : services réseau, routage, MPLS, sécurité, VoIP/ToIP, QoS, cloud, streaming et environnements Linux. J’ai également effectué un stage à l’ASECNA au sein de la DTI/CNS - cellule Communication.":
    "I design, configure and test network and telecommunications environments through hands-on projects involving network services, routing, MPLS, security, VoIP/ToIP, QoS, cloud computing, streaming and Linux environments. I also completed an internship at ASECNA within the DTI/CNS Communication Unit.",

  "Me contacter":
    "Contact me",

  "Découvrir mon profil":
    "View my profile",

  "📍 Dakar, Sénégal":
    "📍 Dakar, Senegal",

  /* ---------- Profil ---------- */

  "01 · Profil":
    "01 · Profile",

  "À propos de moi":
    "About me",

  "Diplômé":
    "Graduate",

  "Master Télécommunications & Multimédia (2024-2026)":
    "Master's in Telecommunications & Multimedia (2024-2026)",

  "projets techniques documentés":
    "documented technical projects",

  "domaines techniques explorés":
    "technical areas explored",

  "environnement central de plusieurs labs":
    "core environment for several labs",

  "Réseaux TCP/IP":
    "TCP/IP Networks",

  "Services Réseau":
    "Network Services",

  "Cybersécurité":
    "Cybersecurity",

  /* ---------- Compétences ---------- */

  "02 · Compétences":
    "02 · Skills",

  "Compétences techniques":
    "Technical Skills",

  "Compétences issues des projets réalisés durant mon parcours en Réseaux, Télécommunications et Multimédia.":
    "Skills developed through projects completed during my studies in Networks, Telecommunications and Multimedia.",

  "Réseaux IP & Services":
    "IP Networks & Services",

  "Adressage IPv4, DHCP, DHCP Relay, routage et services client/serveur.":
    "IPv4 addressing, DHCP, DHCP Relay, routing and client/server services.",

  "Routage & MPLS":
    "Routing & MPLS",

  "Backbone opérateur, routage dynamique, VPN L3 et interconnexion multi-sites.":
    "Service provider backbone, dynamic routing, L3 VPNs and multi-site interconnection.",

  "Linux & Services Réseau":
    "Linux & Network Services",

  "Administration Ubuntu et déploiement de services réseau applicatifs.":
    "Ubuntu administration and deployment of network application services.",

  "Cybersécurité réseau & VoIP":
    "Network & VoIP Cybersecurity",

  "Détection, analyse et réaction face aux attaques réseau et SIP.":
    "Detection, analysis and response to network and SIP attacks.",

  "VPN & Chiffrement":
    "VPN & Encryption",

  "Sécurisation des communications inter-sites avec GETVPN et IPsec.":
    "Securing inter-site communications using GETVPN and IPsec.",

  "Construction d’une architecture AWS segmentée pour une application web.":
    "Design of a segmented AWS architecture for a web application.",

  "Multimédia sur IP":
    "Multimedia over IP",

  "VoIP / ToIP & Qualité de Service":
    "VoIP / ToIP & Quality of Service",

  "Configuration de services téléphoniques IP, analyse RTP, codecs, QoS et interopérabilité multi-protocoles.":
    "Configuration of IP telephony services, RTP analysis, codecs, QoS and multi-protocol interoperability.",

  /* ---------- Projets ---------- */

  "03 · Projets":
    "03 · Projects",

  "Mes projets techniques":
    "My Technical Projects",

  "Huit projets sélectionnés et documentés, classés par domaine. Cliquez sur un projet pour consulter l’architecture, les étapes, les technologies et les résultats.":
    "Eight selected and documented projects organized by technical area. Click a project to explore its architecture, implementation steps, technologies and results.",

  "Domaine 01":
    "Area 01",

  "Domaine 02":
    "Area 02",

  "Domaine 03":
    "Area 03",

  "Domaine 04":
    "Area 04",

  "Domaine 05":
    "Area 05",

  "Domaine 06":
    "Area 06",

  "Services Réseaux":
    "Network Services",

  "Réseaux opérateurs & MPLS":
    "Service Provider Networks & MPLS",

  "Cybersécurité & Sécurité Réseau":
    "Cybersecurity & Network Security",

  "Sécurité VoIP":
    "VoIP Security",

  "Sécurité Réseau":
    "Network Security",

  "Sécurité des réseaux":
    "Network Security",

  "Cybersécurité VoIP":
    "VoIP Cybersecurity",

  "1 projet":
    "1 project",

  "2 projets":
    "2 projects",

  "Voir le projet":
    "View project",

  /* ---------- Cartes projets ---------- */

  "Messagerie Openfire & OpenLDAP":
    "Openfire & OpenLDAP Messaging",

  "Messagerie instantanée avec Openfire & OpenLDAP":
    "Instant Messaging with Openfire & OpenLDAP",

  "Messagerie XMPP sous Ubuntu avec gestion centralisée des utilisateurs via LDAP.":
    "XMPP messaging on Ubuntu with centralized user management through LDAP.",

  "Serveur DHCP & DHCP Relay":
    "DHCP Server & DHCP Relay",

  "Attribution dynamique d’adresses IP à travers plusieurs sous-réseaux via un relais DHCP.":
    "Dynamic IP address assignment across multiple subnets using a DHCP relay.",

  "VPN MPLS Hub-and-Spoke & accès Internet centralisé":
    "Hub-and-Spoke MPLS VPN & Centralized Internet Access",

  "Interconnexion d’un siège et de deux agences via un backbone IP/MPLS, VPN L3, MP-BGP et NAT.":
    "Interconnection of a headquarters and two branch offices through an IP/MPLS backbone using L3 VPN, MP-BGP and NAT.",

  "Détection & réponse aux attaques SIP":
    "SIP Attack Detection & Response",

  "Simulation d’attaques SIP sur Asterisk, détection Wazuh, blocage Fail2ban et visualisation Grafana.":
    "Simulation of SIP attacks against Asterisk, Wazuh detection, Fail2ban blocking and Grafana visualization.",

  "Sécurisation inter-sites avec GETVPN":
    "Inter-Site Security with GETVPN",

  "Chiffrement de groupe pour un réseau multi-sites sans tunnels IPsec point-à-point.":
    "Group encryption for a multi-site network without point-to-point IPsec tunnels.",

  "Architecture Cloud AWS - SmartSchool":
    "AWS Cloud Architecture - SmartSchool",

  "VPC segmentée avec subnet public/privé, serveur web EC2, base RDS privée et contrôle d’accès.":
    "Segmented VPC with public and private subnets, an EC2 web server, private RDS database and access control.",

  "Streaming adaptatif HTTP Live Streaming":
    "Adaptive HTTP Live Streaming",

  "Encodage multi-bitrate, segmentation HLS, lecture réseau et analyse des échanges HTTP avec Wireshark.":
    "Multi-bitrate encoding, HLS segmentation, network playback and HTTP traffic analysis with Wireshark.",

  "Architecture VoIP/ToIP, QoS & interopérabilité Asterisk":
    "VoIP/ToIP Architecture, QoS & Asterisk Interoperability",

  "Mise en œuvre de services ToIP avancés, analyse de la QoS des flux RTP et interconnexion de serveurs Asterisk avec un routeur Cisco et plusieurs protocoles de signalisation.":
    "Implementation of advanced IP telephony services, RTP QoS analysis and interconnection of Asterisk servers through a Cisco router using multiple signaling protocols.",

  /* ---------- Parcours ---------- */

  "04 · Parcours":
    "04 · Background",

  "Formation & expérience":
    "Education & Experience",

  "Un parcours construit autour des réseaux, des télécommunications et de la mise en pratique sur des environnements techniques réels.":
    "A background built around networks, telecommunications and hands-on experience in real technical environments.",

  "Formation":
    "Education",

  "Licence en Mathématiques et Informatique Appliquées":
    "Bachelor's Degree in Applied Mathematics and Computer Science",

  "Diplôme obtenu en 2024":
    "Degree obtained in 2024",

  "Formation scientifique combinant mathématiques, informatique et méthodes d’analyse appliquées.":
    "Scientific education combining mathematics, computer science and applied analytical methods.",

  "Master Télécommunications & Multimédia":
    "Master's Degree in Telecommunications & Multimedia",

  "École Supérieure Multinationale des Télécommunications (ESMT)":
    "Multinational Graduate School of Telecommunications (ESMT)",

  "Diplôme obtenu et soutenu. Formation orientée réseaux IP, télécommunications, services réseau, sécurité, cloud, multimédia, VoIP/ToIP, QoS et réseaux IP.":
    "Degree completed and successfully defended. The program focused on IP networks, telecommunications, network services, security, cloud computing, multimedia, VoIP/ToIP and QoS.",

  "Juin 2026 - Octobre 2026":
    "June 2026 - October 2026",

  "Stage":
    "Internship",

  "Direction Technique et Informatique (DTI) - CNS : Communication, Navigation et Surveillance - Cellule Communication":
    "Technical and IT Directorate (DTI) - CNS: Communication, Navigation and Surveillance - Communication Unit",

  "Stage réalisé au sein de la Direction Technique et Informatique (DTI), dans le domaine CNS (Communication, Navigation et Surveillance), plus particulièrement au niveau de la cellule Communication.":
    "Internship completed within the Technical and IT Directorate (DTI), in the CNS (Communication, Navigation and Surveillance) domain, specifically within the Communication Unit.",

  /* ---------- Contact ---------- */

  "Échangeons":
    "Let's Connect",

  "N'hésitez pas à me contacter pour échanger autour d'une opportunité, d'un projet ou d'une collaboration en Réseaux et Télécommunications.":
    "Feel free to contact me to discuss an opportunity, a project or a collaboration in Networks and Telecommunications.",

  "Whatsapp Sénégal":
    "WhatsApp Senegal",

  "Whatsapp Bénin":
    "WhatsApp Benin",

  /* =========================================================
     MODALES - TERMES COMMUNS
     ========================================================= */

  "Objectif":
    "Objective",

  "Problématique":
    "Challenge",

  "Architecture":
    "Architecture",

  "Réalisation":
    "Implementation",

  "Résultat":
    "Result",

  "Validation":
    "Validation",

  "Technologies":
    "Technologies",

  "Contexte & objectif":
    "Context & Objective",

  "Principe d’architecture":
    "Architecture Principle",

  "Architecture mise en place":
    "Implemented Architecture",

  "Chaîne de traitement":
    "Processing Pipeline",

  "Vue d'ensemble":
    "Overview",

  /* ---------- Openfire ---------- */

  "Mise en place d’une solution de communication interne avec gestion centralisée des comptes utilisateurs.":
    "Implementation of an internal communication solution with centralized user account management.",

  "Mettre en place une messagerie instantanée locale permettant à des utilisateurs gérés dans un annuaire LDAP de s’authentifier puis d’échanger des messages en temps réel via XMPP.":
    "Deploy a local instant messaging system allowing users managed in an LDAP directory to authenticate and exchange real-time messages through XMPP.",

  "Serveur Ubuntu":
    "Ubuntu Server",

  "Gestion centralisée des utilisateurs":
    "Centralized User Management",

  "Serveur de messagerie XMPP":
    "XMPP Messaging Server",

  "Client Ubuntu":
    "Ubuntu Client",

  "Connexion et échanges de messages":
    "Connection and Messaging",

  "Configuration réseau du serveur Ubuntu":
    "Ubuntu server network configuration",

  "Installation et configuration d’OpenLDAP":
    "OpenLDAP installation and configuration",

  "Création des comptes utilisateurs LDAP":
    "Creation of LDAP user accounts",

  "Installation du serveur Openfire":
    "Openfire server installation",

  "Intégration d’Openfire à l’annuaire LDAP":
    "Integration of Openfire with the LDAP directory",

  "Configuration de Gajim et tests de messagerie":
    "Gajim configuration and messaging tests",

  "Authentification et communication validées":
    "Authentication and Communication Successfully Validated",

  "Les comptes utilisateurs présents dans l’annuaire ont été utilisés pour se connecter au service XMPP, puis des échanges de messages ont été réalisés entre les clients.":
    "User accounts stored in the directory were successfully used to connect to the XMPP service and exchange messages between clients.",

  /* ---------- DHCP ---------- */

  "Attribution automatique d’adresses IP à un client situé dans un sous-réseau différent de celui du serveur DHCP.":
    "Automatic IP address assignment to a client located in a subnet different from the DHCP server.",

  "Les requêtes DHCP sont initialement diffusées en broadcast et ne traversent pas naturellement plusieurs sous-réseaux. L’objectif était donc d’utiliser un relais DHCP pour transférer les requêtes du client vers un serveur central.":
    "DHCP requests are initially broadcast and do not naturally cross multiple subnets. The goal was therefore to use a DHCP relay to forward client requests to a centralized server.",

  "VM intermédiaire":
    "Intermediate VM",

  "Relais entre les deux réseaux":
    "Relay between both networks",

  "Serveur DHCP":
    "DHCP Server",

  "Création de trois machines virtuelles":
    "Creation of three virtual machines",

  "Configuration du serveur ISC DHCP":
    "ISC DHCP server configuration",

  "Définition des sous-réseaux et plages DHCP":
    "Definition of subnets and DHCP pools",

  "Configuration de isc-dhcp-relay":
    "isc-dhcp-relay configuration",

  "Gestion du champ giaddr et des interfaces":
    "Configuration of the giaddr field and interfaces",

  "Validation des échanges et de l’adresse obtenue":
    "Validation of DHCP exchanges and assigned address",

  "Attribution distante d’adresse IP validée":
    "Remote IP Address Assignment Successfully Validated",

  "Le client situé sur le réseau 192.168.20.0/24 reçoit sa configuration depuis le serveur DHCP situé sur le réseau 192.168.10.0/24 grâce au relais intermédiaire.":
    "The client on network 192.168.20.0/24 receives its configuration from the DHCP server on network 192.168.10.0/24 through the intermediate relay.",

  /* ---------- MPLS ---------- */

  "Conception et configuration d’une architecture IP/MPLS reliant un siège et deux agences.":
    "Design and configuration of an IP/MPLS architecture connecting a headquarters and two branch offices.",

  "Interconnecter le siège d’Indépendance avec les agences de Tamba et Kaolack à travers une infrastructure opérateur MPLS. Le VPN est de type Hub-and-Spoke : les agences communiquent avec le siège, tandis que l’accès Internet est centralisé au siège.":
    "Interconnect the Indépendance headquarters with the Tamba and Kaolack branches through a service provider MPLS infrastructure. The VPN uses a Hub-and-Spoke topology: branches communicate with headquarters while Internet access is centralized at headquarters.",

  "Agence":
    "Branch",

  "Backbone opérateur":
    "Service Provider Backbone",

  "Siège Indépendance":
    "Indépendance Headquarters",

  "LAN 10.1.1.0/24 · sortie Internet":
    "LAN 10.1.1.0/24 · Internet access",

  "Plan d’adressage du backbone et des LAN":
    "Backbone and LAN addressing plan",

  "Routage OSPF dans le cœur opérateur":
    "OSPF routing within the provider core",

  "Activation MPLS et distribution des labels via LDP":
    "MPLS activation and label distribution using LDP",

  "Création des instances VPN / VRF":
    "Creation of VPN / VRF instances",

  "Propagation des routes VPN avec MP-BGP":
    "VPN route propagation using MP-BGP",

  "Accès Internet centralisé et traduction NAT":
    "Centralized Internet access and NAT translation",

  "VPN L3 et routage inter-sites opérationnels":
    "L3 VPN and Inter-Site Routing Operational",

  "Les tests confirment la connectivité entre les agences et le siège, l’isolation Hub-and-Spoke et la propagation correcte des routes VPN. L’accès Internet des agences est réalisé via le siège.":
    "Tests confirm connectivity between branches and headquarters, Hub-and-Spoke isolation and correct VPN route propagation. Branch Internet access is provided through headquarters.",

  /* ---------- SIP ---------- */

  "Architecture expérimentale combinant simulation d’attaque, détection, corrélation et réaction automatique.":
    "Experimental architecture combining attack simulation, detection, correlation and automated response.",

  "Étudier comment détecter et traiter des scans et tentatives de brute force visant un serveur VoIP Asterisk exposant le service SIP.":
    "Study how to detect and respond to scans and brute-force attempts targeting an Asterisk VoIP server exposing the SIP service.",

  "Attaquant":
    "Attacker",

  "Cible":
    "Target",

  "Détection":
    "Detection",

  "Analyse · alertes · Grafana":
    "Analysis · Alerts · Grafana",

  "Déploiement du serveur VoIP Asterisk":
    "Deployment of the Asterisk VoIP server",

  "Scan SIP avec SIPVicious / svmap":
    "SIP scan using SIPVicious / svmap",

  "Simulation de brute force avec svcrack":
    "Brute-force simulation using svcrack",

  "Collecte et corrélation des logs avec Wazuh":
    "Log collection and correlation with Wazuh",

  "Réaction automatique via Fail2ban":
    "Automated response using Fail2ban",

  "Visualisation des événements dans Grafana":
    "Event visualization in Grafana",

  "Attaque détectée sans compromission du compte testé":
    "Attack Detected Without Compromising the Tested Account",

  "Le brute force simulé n’a pas trouvé de mot de passe valide. Wazuh a toutefois corrélé les échecs d’authentification et généré une alerte de niveau élevé, démontrant la détection des tentatives répétées.":
    "The simulated brute-force attack did not find a valid password. However, Wazuh correlated the authentication failures and generated a high-level alert, demonstrating successful detection of repeated attempts.",

  /* ---------- GETVPN ---------- */

  "Protection d’un réseau d’entreprise multi-sites par chiffrement de groupe sans tunnels point-à-point.":
    "Protection of a multi-site enterprise network using group encryption without point-to-point tunnels.",

  "Sécuriser les communications entre un siège à Dakar et des agences distantes à travers un WAN partagé, tout en préservant le routage et les adresses IP d’origine.":
    "Secure communications between a headquarters in Dakar and remote branches across a shared WAN while preserving routing and original IP addresses.",

  "Contrôle":
    "Control",

  "Groupe":
    "Group",

  "Chiffrement / déchiffrement IPsec":
    "IPsec Encryption / Decryption",

  "Transport":
    "Transport",

  "Routage transparent · Header Preservation":
    "Transparent Routing · Header Preservation",

  "Connectivité IP et routage OSPF":
    "IP connectivity and OSPF routing",

  "Configuration ISAKMP / IKE":
    "ISAKMP / IKE configuration",

  "Transform-set et profil IPsec":
    "IPsec transform-set and profile",

  "Configuration du groupe GDOI et du rekey":
    "GDOI group and rekey configuration",

  "Enregistrement des Group Members":
    "Registration of Group Members",

  "Validation du chiffrement par analyse Wireshark":
    "Encryption validation through Wireshark analysis",

  "Trafic inter-sites protégé par ESP":
    "Inter-Site Traffic Protected by ESP",

  "L’analyse des paquets confirme que le trafic est chiffré par ESP tout en conservant les adresses IP source et destination, ce qui maintient la transparence du routage.":
    "Packet analysis confirms that traffic is encrypted using ESP while preserving source and destination IP addresses, maintaining routing transparency.",

  /* ---------- AWS ---------- */

  "Construction d’une architecture réseau et applicative segmentée dans AWS Academy.":
    "Design of a segmented network and application architecture in AWS Academy.",

  "Le projet repose sur une VPC personnalisée comprenant un subnet public et un subnet privé, une Internet Gateway, des tables de routage, un serveur web EC2 et une base de données RDS déployée dans la partie privée.":
    "The project uses a custom VPC containing a public subnet and a private subnet, an Internet Gateway, routing tables, an EC2 web server and an RDS database deployed in the private network.",

  "Création de la VPC et des deux subnets":
    "Creation of the VPC and both subnets",

  "Internet Gateway et tables de routage":
    "Internet Gateway and routing tables",

  "Déploiement d’une instance EC2 pour le serveur web":
    "Deployment of an EC2 instance for the web server",

  "Déploiement RDS dans le subnet privé":
    "RDS deployment in the private subnet",

  "Configuration des Security Groups et accès EC2 → RDS":
    "Security Group configuration and EC2 → RDS access",

  "Utilisation de S3 et du rôle IAM disponible dans AWS Academy":
    "Use of S3 and the IAM role available in AWS Academy",

  "Architecture web segmentée et fonctionnelle":
    "Functional Segmented Web Architecture",

  "Le serveur web est exposé via le subnet public tandis que la base RDS reste dans le réseau privé. Le projet applique une séparation réseau et des règles d’accès entre les composants.":
    "The web server is exposed through the public subnet while the RDS database remains in the private network. The project applies network segmentation and access rules between components.",

  /* ---------- HLS ---------- */

  "Mise en œuvre d’une chaîne de diffusion HLS et analyse des échanges réseau générés.":
    "Implementation of an HLS streaming pipeline and analysis of the generated network traffic.",

  "Générer plusieurs qualités d’une vidéo, créer les segments HLS et les manifestes, lire le flux depuis un poste client puis observer les requêtes HTTP avec Wireshark.":
    "Generate several video quality levels, create HLS segments and manifests, play the stream from a client workstation and observe HTTP requests using Wireshark.",

  "Source":
    "Source",

  "Vidéo MP4":
    "MP4 Video",

  "Fichier source sous Linux":
    "Source file on Linux",

  "Traitement":
    "Processing",

  "Diffusion":
    "Delivery",

  "Préparation de la VM Ubuntu":
    "Ubuntu VM preparation",

  "Encodage H.264 avec plusieurs résolutions et débits":
    "H.264 encoding with multiple resolutions and bitrates",

  "Segmentation du contenu en fichiers .ts":
    "Content segmentation into .ts files",

  "Création des manifestes .m3u8":
    "Creation of .m3u8 manifests",

  "Lecture du flux depuis un poste Windows":
    "Stream playback from a Windows workstation",

  "Analyse des requêtes HTTP dans Wireshark":
    "Analysis of HTTP requests in Wireshark",

  "Flux HLS diffusé et échanges HTTP observés":
    "HLS Stream Delivered and HTTP Traffic Observed",

  "La lecture permet de valider la chaîne de diffusion. Wireshark met en évidence les requêtes vers le manifeste .m3u8 puis les téléchargements successifs des segments vidéo .ts.":
    "Playback validates the streaming pipeline. Wireshark highlights requests to the .m3u8 manifest followed by successive downloads of the .ts video segments.",

  /* ---------- VoIP / ToIP ---------- */

  "Configuration de services ToIP, analyse des performances RTP et interconnexion de plusieurs environnements de téléphonie IP.":
    "Configuration of ToIP services, RTP performance analysis and interconnection of multiple IP telephony environments.",

  "Le projet combine trois volets : services ToIP avancés, analyse expérimentale de la QoS et interconnexion multi-protocoles autour d'Asterisk.":
    "The project combines three components: advanced ToIP services, experimental QoS analysis and multi-protocol interconnection around Asterisk.",

  "Services ToIP":
    "ToIP Services",

  "Appels vidéo - Call Pickup - Hotline - CDR - Trunks":
    "Video Calls - Call Pickup - Hotline - CDR - Trunks",

  "Flux médias":
    "Media Streams",

  "Bande passante - Gigue - Latence - Pertes - Codecs":
    "Bandwidth - Jitter - Latency - Packet Loss - Codecs",

  "Interopérabilité":
    "Interoperability",

  "1. Services ToIP avancés":
    "1. Advanced ToIP Services",

  "Configuration et test des appels vidéo":
    "Configuration and testing of video calls",

  "Mise en place du Call Pickup":
    "Call Pickup implementation",

  "Configuration d'une Hotline automatique":
    "Automatic Hotline configuration",

  "Collecte et affichage des statistiques CDR":
    "Collection and display of CDR statistics",

  "Automatisation avec Python, MySQL et systemd":
    "Automation with Python, MySQL and systemd",

  "Partage de charge : 40% IAX et 60% SIP":
    "Load sharing: 40% IAX and 60% SIP",

  "2. Analyse QoS des flux RTP":
    "2. RTP Traffic QoS Analysis",

  "Analyse des communications en Wi-Fi et Ethernet en faisant varier les codecs et le temps de paquétisation. Les mesures portent sur la bande passante, la gigue, la latence et les pertes de paquets.":
    "Analysis of Wi-Fi and Ethernet communications using different codecs and packetization times. Measurements focus on bandwidth, jitter, latency and packet loss.",

  "3. Interconnexion & signalisation":
    "3. Interconnection & Signaling",

  "Interconnexion de plusieurs serveurs Asterisk à travers un routeur Cisco, intégration avec un Call Manager UC560 et validation des appels entre abonnés utilisant plusieurs protocoles de signalisation.":
    "Interconnection of multiple Asterisk servers through a Cisco router, integration with a UC560 Call Manager and validation of calls between users using multiple signaling protocols.",

  "Architecture ToIP configurée, analysée et testée":
    "ToIP Architecture Configured, Analyzed and Tested",

  "Les services avancés ont été validés, les flux RTP ont été analysés sous différentes conditions réseau et des communications ont été réalisées entre environnements SIP, PJSIP, IAX et SCCP.":
    "Advanced services were validated, RTP streams were analyzed under different network conditions and communications were successfully established between SIP, PJSIP, IAX and SCCP environments."
};


/* =========================================================
   PARAGRAPHES DU PROFIL
   ========================================================= */

const profileTranslations = [
  `
    <strong>Network & Telecommunications Engineer</strong> with a Master's degree
    in Telecommunications & Multimedia. I develop my expertise in IP networks,
    Linux systems, network services, security, cloud computing and modern
    telecommunications architectures.
  `,

  `
    My approach is primarily hands-on: I build lab environments, configure
    equipment and services, perform connectivity tests, analyze network traffic
    and document the results.
  `,

  `
    From <strong>June 2026 to October 2026</strong>, I completed an internship at
    <strong>ASECNA</strong>, within the
    <strong>Technical and IT Directorate (DTI)</strong>, in the
    <strong>CNS - Communication, Navigation and Surveillance</strong> domain,
    specifically within the <strong>Communication Unit</strong>.
  `,

  `
    My projects include <strong>XMPP messaging with Openfire and OpenLDAP</strong>,
    <strong>DHCP and DHCP Relay</strong>, <strong>MPLS</strong> architectures,
    VoIP security, <strong>GETVPN</strong>, AWS Cloud, HLS streaming,
    as well as <strong>VoIP/ToIP and RTP traffic QoS</strong>.
  `
];


/* =========================================================
   FONCTIONS
   ========================================================= */

function normalizeI18nText(text) {
  return text.replace(/\s+/g, " ").trim();
}


/* Sauvegarde des paragraphes Profil en français */

const profileParagraphs =
  [...document.querySelectorAll(".profile-content > p")];

const originalProfileHTML =
  profileParagraphs.map(paragraph => paragraph.innerHTML);


/* Sauvegarde des textes traduisibles */

const translatableTextNodes = [];

const walker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_TEXT,
  {
    acceptNode(node) {

      const parent = node.parentElement;

      if (!parent) {
        return NodeFilter.FILTER_REJECT;
      }

      if (
        parent.closest("script") ||
        parent.closest("style") ||
        parent.closest(".language-switch") ||
        parent.closest(".profile-content")
      ) {
        return NodeFilter.FILTER_REJECT;
      }

      const normalized =
        normalizeI18nText(node.nodeValue);

      if (
        normalized &&
        Object.prototype.hasOwnProperty.call(
          translationsEN,
          normalized
        )
      ) {
        return NodeFilter.FILTER_ACCEPT;
      }

      return NodeFilter.FILTER_REJECT;
    }
  }
);


while (walker.nextNode()) {

  const node = walker.currentNode;

  translatableTextNodes.push({
    node: node,
    original: node.nodeValue,
    key: normalizeI18nText(node.nodeValue)
  });

}


/* Attributs accessibles */

const attributeTranslations = {

  "Retour à l'accueil":
    "Back to home",

  "Ouvrir le menu":
    "Open menu",

  "Aller à la section profil":
    "Go to profile section",

  "Retour en haut":
    "Back to top",

  "Fermer":
    "Close",

  "Choix de la langue":
    "Language selection"

};


const attributeElements = [];

document
  .querySelectorAll("[aria-label]")
  .forEach(element => {

    const value =
      element.getAttribute("aria-label");

    if (
      attributeTranslations[value]
    ) {

      attributeElements.push({
        element: element,
        attribute: "aria-label",
        original: value
      });

    }

  });


/* Titre et description de la page */

const originalDocumentTitle =
  document.title;

const metaDescription =
  document.querySelector('meta[name="description"]');

const originalDescription =
  metaDescription
    ? metaDescription.getAttribute("content")
    : "";


/* =========================================================
   CHANGEMENT DE LANGUE
   ========================================================= */

function changePortfolioLanguage(language) {

  const isEnglish =
    language === "en";


  /* Textes simples */

  translatableTextNodes.forEach(item => {

    if (!isEnglish) {

      item.node.nodeValue =
        item.original;

      return;

    }

    const leadingWhitespace =
      item.original.match(/^\s*/)?.[0] || "";

    const trailingWhitespace =
      item.original.match(/\s*$/)?.[0] || "";

    item.node.nodeValue =
      leadingWhitespace +
      translationsEN[item.key] +
      trailingWhitespace;

  });


  /* Paragraphes du profil */

  profileParagraphs.forEach(
    (paragraph, index) => {

      if (isEnglish) {

        if (profileTranslations[index]) {
          paragraph.innerHTML =
            profileTranslations[index];
        }

      } else {

        paragraph.innerHTML =
          originalProfileHTML[index];

      }

    }
  );


  /* Attributs aria-label */

  attributeElements.forEach(item => {

    item.element.setAttribute(
      item.attribute,
      isEnglish
        ? attributeTranslations[item.original]
        : item.original
    );

  });


  /* Langue HTML */

  document.documentElement.lang =
    language;


  /* Titre de l'onglet */

  document.title =
    isEnglish
      ? "Irénée ATISSOUSSI | Network & Telecommunications Engineer"
      : originalDocumentTitle;


  /* Description SEO */

  if (metaDescription) {

    metaDescription.setAttribute(
      "content",
      isEnglish
        ? "Portfolio of Irénée Mahutin ATISSOUSSI - Networks, Telecommunications, Systems and Cloud."
        : originalDescription
    );

  }


  /* Boutons FR / EN */

  document
    .querySelectorAll(".lang-btn")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.lang === language
      );

      button.setAttribute(
        "aria-pressed",
        button.dataset.lang === language
          ? "true"
          : "false"
      );

    });


  /* Mémorisation */

  localStorage.setItem(
    "portfolioLanguage",
    language
  );

}


/* =========================================================
   EVENEMENTS
   ========================================================= */

document
  .querySelectorAll(".lang-btn")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        changePortfolioLanguage(
          button.dataset.lang
        );

      }
    );

  });


/* Langue mémorisée */

const savedPortfolioLanguage =
  localStorage.getItem(
    "portfolioLanguage"
  ) || "fr";


changePortfolioLanguage(
  savedPortfolioLanguage
);
