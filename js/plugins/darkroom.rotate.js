(function () {
  'use strict';

  var Rotation = Darkroom.Transformation.extend({
    applyTransformation: function (canvas, image, next) {

      // Абсолютный или относительный угол
      if (this.options.flag === 'absolute') {
        var angle = this.options.angle;
        // Округляем до десятков
        angle = Math.round(angle / 10) * 10;
        // Ограничения от -180 до 180
        if (angle > 180)
          angle = 180;
        else if (angle < -180)
          angle = -180;

      } else {
        var angle = (image.getAngle() + this.options.angle);
        // // Ограничения от -180 до 180
        if (angle > 180)
          angle = -170;
        else if (angle < -180)
          angle = 170;
      }

      image.rotate(angle);

      var width, height;
      height = Math.abs(image.getWidth() * (Math.sin(angle * Math.PI / 180))) + Math.abs(image.getHeight() * (Math.cos(angle * Math.PI / 180)));
      width = Math.abs(image.getHeight() * (Math.sin(angle * Math.PI / 180))) + Math.abs(image.getWidth() * (Math.cos(angle * Math.PI / 180)));

      canvas.setWidth(width);
      canvas.setHeight(height);

      canvas.centerObject(image);
      image.setCoords();
      canvas.renderAll();

      // Устанавливаем значение в поле ввода угла
      setRotationInputFieldValue(this.options.rotationInputFieldId, angle);

      next();
    }
  });

  function setRotationInputFieldValue(rotationInputFieldId, angle) {
    var inputField = document.getElementById(rotationInputFieldId);
    inputField.value = angle;
  }

  Darkroom.plugins['rotate'] = Darkroom.Plugin.extend({

    initialize: function InitDarkroomRotatePlugin() {
      var buttonGroup = this.darkroom.toolbar.createButtonGroup();

      var leftButton = buttonGroup.createButton({
        image: 'rotate-left'
      });
      
      var rotationInput = buttonGroup.createInputField({
        id: 'rotation-angle',
        className: 'darkroom-input darkroom-input-default',
        step: '10',
        min: '-180',
        max: '180',
        value: '0'
      });

      var rightButton = buttonGroup.createButton({
        image: 'rotate-right'
      });

      leftButton.addEventListener('click', this.rotateLeft.bind(this));
      rightButton.addEventListener('click', this.rotateRight.bind(this));

      rotationInput.addEventListener('change', this.setAngle.bind(this));
    },

    rotateLeft: function rotateLeft() {
      this.rotate(-10);
    },

    rotateRight: function rotateRight() {
      this.rotate(10);
    },

    setAngle: function setAngle() {
      var rotationInputFieldId = 'rotation-angle';
      var inputField = document.getElementById(rotationInputFieldId);
      this.rotate(inputField.value, rotationInputFieldId, 'absolute');
    },

    rotate: function rotate(angle, rotationInputFieldId, flag) {
      this.darkroom.inputValueFlag = flag;
      this.darkroom.applyTransformation(
              new Rotation({
                angle: angle,
                flag: flag ? flag : 'relative',
                rotationInputFieldId: rotationInputFieldId ? rotationInputFieldId : 'rotation-angle'})
              );
    }

  });

})();
