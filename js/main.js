var normal = document.getElementById("nav-menu");
var reverse = document.getElementById("nav-menu-right");

var icon = normal !== null ? normal : reverse;

// Toggle the "menu-open" & "menu-open-left" classes
function toggle() {
	  var navLeft = document.getElementById("nav");
	  var navRight = document.getElementById("nav-right");
	  var nav = navLeft !== null ? navLeft : navRight;

	  var button = document.getElementById("menu");
	  var site = document.getElementById("wrap");
	  
	  if (nav.className == "menu-open" || nav.className == "menu-open-right") {
	  	  nav.className = "";
	  	  button.className = "";
	  	  site.className = "";
	  } else if (reverse !== null) {
	  	  nav.className += "menu-open-right";
	  	  button.className += "btn-close";
	  	  site.className += "fixed";
	  } else {
	  	  nav.className += "menu-open";
	  	  button.className += "btn-close";
	  	  site.className += "fixed";
	    }
	}

// Ensures backward compatibility with IE old versions
function menuClick() {
	if (document.addEventListener && icon !== null) {
		icon.addEventListener('click', toggle);
	} else if (document.attachEvent && icon !== null) {
		icon.attachEvent('onclick', toggle);
	} else {
		return;
	}
}

menuClick();

// Copy to clipboard for code blocks
function addCopyButtons() {
  document.querySelectorAll('div.highlight').forEach(function(block) {
    var btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.textContent = 'Copiar';
    btn.setAttribute('aria-label', 'Copiar código');
    block.appendChild(btn);

    btn.addEventListener('click', function() {
      var text = getCodeText(block);
      if (!text) return;
      navigator.clipboard.writeText(text).then(function() {
        btn.textContent = 'Copiado ✓';
        setTimeout(function() { btn.textContent = 'Copiar'; }, 2000);
      }).catch(function() {
        btn.textContent = 'Erro';
        setTimeout(function() { btn.textContent = 'Copiar'; }, 2000);
      });
    });
  });
}

function getCodeText(block) {
  // Table layout: div.highlight > table > tr > td.code > pre
  var codeCell = block.querySelector('td.code');
  if (codeCell) {
    var pre = codeCell.querySelector('pre');
    return pre ? pre.innerText.trim() : codeCell.innerText.trim();
  }

  // Inline linenos layout: clone code and strip .lineno spans
  var code = block.querySelector('code');
  if (!code) return null;
  var clone = code.cloneNode(true);
  clone.querySelectorAll('.lineno, .ln').forEach(function(el) { el.remove(); });
  return clone.innerText.trim();
}

document.addEventListener('DOMContentLoaded', addCopyButtons);