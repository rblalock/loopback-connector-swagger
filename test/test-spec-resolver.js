var should = require('should');
//var SwaggerConnector = require('./index');
var resolveSpec = require('../lib/spec-resolver').resolveSpec;
var validateSpec = require('../lib/spec-resolver').validateSpec;

describe('Swagger Spec resolver', function() {
  it('Should set url when given spec is a url', function(done) {
    var self = setSpec('http://sample.com/swaggerAPI.json');
    resolveSpec(self, function(err) {
      should.not.exist(err);
      self.should.have.property('url');
      should(self.spec).be.exactly(null);
      done();
    });
  });

  it('Should set spec object when given spec is swagger specification object',
    function(done) {
      var self = setSpec(require('./fixtures/petStore'));
      resolveSpec(self, function(err) {
        should.not.exist(err);
        self.spec.should.have.property('swagger');
        done();
      });
    });

  it('Should not accept specification types other than string/plain object',
    function(done) {
      var self = setSpec(function test() { });
      resolveSpec(self, function(err) {
        should.exist(err);
        done();
      });
    });

  describe('File handling & spec resolution', function() {
    it('should read & set swagger spec from a local .json file',
      function(done) {
        var self = setSpec('./test/fixtures/petStore.json');
        resolveSpec(self, function(err) {
          should.not.exist(err);
          self.spec.should.have.property('swagger');
          done();
        });
      });

    it('should read & set swagger spec from a local .yaml file',
      function(done) {
        var self = setSpec('./test/fixtures/petStore.yaml');
        resolveSpec(self, function(err) {
          should.not.exist(err);
          self.spec.should.have.property('swagger');
          done();
        });
      });

    it('should support .yml extension for YAML spec files',
      function(done) {
        var self = setSpec('./test/fixtures/petStore.yml');
        resolveSpec(self, function(err) {
          should.not.exist(err);
          self.spec.should.have.property('swagger');
          done();
        });
      });

    it('should not accept other spec file formats than .json/.yaml',
      function(done) {
        var self = setSpec('./test/fixtures/petStore.yaaml');
        resolveSpec(self, function(err) {
          should.exist(err);
          done();
        });
      });
  });

  describe('Spec validation against Swagger schema 2.0', function() {
    it('should validate provided specification against swagger spec. 2.0',
      function(done) {
        var self = setSpec('./test/fixtures/petStore.yaml');
        var error = null;
        resolveSpec(self, function(err) {
          should.not.exist(err);
          validate(self.spec);
          done();
        });
      });

    it('should throw error if validation fails', function(done) {
      var self = setSpec({ this: 'that' });
      resolveSpec(self, function(err) {
        validate(self.spec);
        done();
      });
    });
  });
});

function setSpec(spec) {
  return {
    spec: spec,
  };
}

function validate(spec) {
  try {
    validateSpec(self.spec);
    should(error).be.eql(null);
    return;
  } catch (err) {
    should.exist(err);
    return;
  }
}
