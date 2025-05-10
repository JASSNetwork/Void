
const pageURLs = {
  home: '/home/',
  minecraft: '/minecraft/',
  games: '/games/',
  exploits: '/exploits/',
  settings: '/settings/'
};

let tabCounter = 1;

function createNewTab(pageName, pageTitle, icon) {
  const tabsContainer = document.querySelector('.tabs');
  const newTab = document.createElement('div');
  newTab.className = 'tab';
  newTab.dataset.page = pageName;
  newTab.dataset.tabId = `tab-${tabCounter++}`;
  newTab.innerHTML = `
    <i class="fas fa-${icon}"></i>
    ${pageTitle}
    <span class="close-btn">×</span>
  `;
  
  newTab.addEventListener('click', function() {
    activateTab(this);
  });
  
  newTab.querySelector('.close-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    closeTab(newTab);
  });
  
  tabsContainer.appendChild(newTab);
  
  const mainContainer = document.querySelector('.main');
  const iframe = document.createElement('iframe');
  iframe.className = 'tab-content';
  iframe.id = newTab.dataset.tabId;
  iframe.src = pageURLs[pageName];
  iframe.title = pageTitle;
  
  mainContainer.appendChild(iframe);
  
  positionNewTabButton();
  
  return newTab;
}

function positionNewTabButton() {
  const tabsContainer = document.querySelector('.tabs');
  const newTabBtn = document.querySelector('.new-tab-btn');
  
  newTabBtn.remove();
  tabsContainer.appendChild(newTabBtn);
}

function activateTab(tab) {

  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  
  tab.classList.add('active');
  
  const tabContent = document.getElementById(tab.dataset.tabId);
  if (tabContent) {
    tabContent.classList.add('active');
  }
}

function closeTab(tab) {
  const tabs = document.querySelectorAll('.tab');
  
  if (tabs.length > 1) {
    const wasActive = tab.classList.contains('active');
    const tabId = tab.dataset.tabId;
    
    tab.remove();
    
    const iframe = document.getElementById(tabId);
    if (iframe) {
      iframe.remove();
    }
    
    if (wasActive) {
      activateTab(document.querySelector('.tab'));
    }
    
    positionNewTabButton();
  }
}


function navigateToPage(pageName) {
  
  const activeTab = document.querySelector('.tab.active');
  if (activeTab) {
    const tabId = activeTab.dataset.tabId;
    const iframe = document.getElementById(tabId);
    
    
    if (iframe) {
      iframe.src = pageURLs[pageName];
    }
  }
}


window.onload = function () {
  
  const tabsContainer = document.querySelector('.tabs');
  const newTabBtn = document.querySelector('.new-tab-btn');
  
  
  newTabBtn.remove();
  
  
  tabsContainer.appendChild(newTabBtn);
  
  
  const tabs = document.querySelectorAll('.tab');
  
  
  tabs.forEach(tab => {
    const pageName = tab.dataset.page;
    const tabId = `tab-${tabCounter++}`;
    tab.dataset.tabId = tabId;
    
    
    const mainContainer = document.querySelector('.main');
    const iframe = document.createElement('iframe');
    iframe.className = 'tab-content';
    iframe.id = tabId;
    iframe.src = pageURLs[pageName];
    iframe.title = tab.textContent.trim().replace('×', '');
    
    mainContainer.appendChild(iframe);
    
    
    tab.addEventListener('click', function() {
      activateTab(this);
    });
  });

  
  const closeBtns = document.querySelectorAll('.close-btn');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeTab(this.parentElement);
    });
  });

  
  const sidebarItems = document.querySelectorAll('.sidebar li');
  const pageNames = ['home', 'minecraft', 'games', 'exploits', 'settings'];
  
  sidebarItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      
      sidebarItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      
      
      navigateToPage(pageNames[index]);
    });
  });
  
  
  newTabBtn.addEventListener('click', function() {
    const newTab = createNewTab('home', 'New Tab', 'home');
    activateTab(newTab);
  });
  
  
  activateTab(document.querySelector('.tab'));
};

function toggleMainFullscreen() {
  const main = document.querySelector('.main');
  if (!main) return;

  if (!document.fullscreenElement) {
    main.requestFullscreen().then(() => {
      main.style.margin = "0";
      main.style.padding = "0";
      main.style.width = "100vw";
      main.style.height = "100vh";
      main.style.overflow = "hidden";

      const iframe = main.querySelector('iframe');
      if (iframe) {
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.style.display = "block";
      }
    }).catch(err => {
      alert(`Error attempting fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener('fullscreenchange', () => {
  const btn = document.querySelector('.fullscreen-toggle');
  if (btn) {
    btn.textContent = document.fullscreenElement ? '🡼' : '⛶';
  }

  const main = document.querySelector('.main');
  if (main && !document.fullscreenElement) {
    main.removeAttribute('style');
    const iframe = main.querySelector('iframe');
    if (iframe) iframe.removeAttribute('style');
  }
});
