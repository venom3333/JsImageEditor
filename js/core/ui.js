(function () {
  'use strict';

  Darkroom.UI = {
    Toolbar: Toolbar,
    ButtonGroup: ButtonGroup,
    Button: Button
  };

// Toolbar object.
  function Toolbar(element) {
    this.element = element;
  }

  Toolbar.prototype = {
    createButtonGroup: function (options) {
      var buttonGroup = document.createElement('div');
      buttonGroup.className = 'darkroom-button-group';
      this.element.appendChild(buttonGroup);

      return new ButtonGroup(buttonGroup);
    }
  };

// ButtonGroup object.
  function ButtonGroup(element) {
    this.element = element;
  }

  ButtonGroup.prototype = {
    createButton: function (options) {
      var defaults = {
        image: 'help',
        type: 'default',
        group: 'default',
        hide: false,
        disabled: false
      };

      options = Darkroom.Utils.extend(options, defaults);

      var buttonElement = document.createElement('button');
      buttonElement.type = 'button';
      buttonElement.className = 'darkroom-button darkroom-button-' + options.type;
      buttonElement.innerHTML = '<svg class="darkroom-icon"><use xlink:href="#' + options.image + '" /></svg>';
      this.element.appendChild(buttonElement);

      var button = new Button(buttonElement);
      button.hide(options.hide);
      button.disable(options.disabled);

      return button;
    },

    createInputField: function (options) {
      var defaults = {
        image: 'help',
        type: 'default',
        group: 'default',
        hide: false,
        disabled: false
      };

      options = Darkroom.Utils.extend(options, defaults);

      // Контейнер для нашего инпут поля
      var inputElementContainer = document.createElement('span');
      inputElementContainer.id = options.id + "-container";
      inputElementContainer.className = 'input-container darkroom-button';

      var inputElement = document.createElement('input');
      inputElement.type = 'number';
      inputElement.id = options.id;
      inputElement.className = options.className;
      inputElement.setAttribute("step", options.step);
      inputElement.setAttribute("min", options.min);
      inputElement.setAttribute("max", options.max);
      inputElement.setAttribute("value", options.value);
      
      //inputElement.innerHTML = '';
      // Прикрепляем к контейнеру
      inputElementContainer.appendChild(inputElement);
      // И вместе с контейнером цепляем к общему элементу UI
      this.element.appendChild(inputElementContainer);

      var inputField = new Button(inputElementContainer);
      inputField.hide(options.hide);
      inputField.disable(options.disabled);

      return inputField;
    }
  };

// Button объект.
  function Button(element) {
    this.element = element;
  }

  Button.prototype = {
    addEventListener: function (eventName, listener) {
      if (this.element.addEventListener) {
        this.element.addEventListener(eventName, listener);
      } else if (this.element.attachEvent) {
        this.element.attachEvent('on' + eventName, listener);
      }
    },
    removeEventListener: function (eventName, listener) {
      if (this.element.removeEventListener) {
        this.element.removeEventListener(eventName, listener);
      }
    },
    active: function (value) {
      if (value)
        this.element.classList.add('darkroom-button-active');
      else
        this.element.classList.remove('darkroom-button-active');
    },
    hide: function (value) {
      if (value)
        this.element.classList.add('darkroom-button-hidden');
      else
        this.element.classList.remove('darkroom-button-hidden');
    },
    disable: function (value) {
      this.element.disabled = (value) ? true : false;
    }
  };

})();
