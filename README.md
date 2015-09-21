# Simples Profissional 


Projeto gerado com [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

Para processo seletivo SIMPLES DENTAL

## Conteudo
- [Build & development](#build-&-development)
- [Testing](#testing)
- [Restangular](#restangular)
- [John Papa Style Guid](#john-papa-style-guid)
- [Lodash](#lodash)
- [Angular Bootstrap](#angular-bootstrap)

## Build & development

Execute o comando `grunt` para building e `grunt serve` para visualizar a aplicação.

## Testing

Executando `grunt test` ira rodar os testes unitárioas com o Karma.

* Não disponível para essa versão.

## Restangular

````javascript

  RestangularProvider.setBaseUrl('http://api.achronic.com');

        RestangularProvider.addResponseInterceptor(function(professionals, operation, what, url, response, deferred) {

            var extractedData;

            if (operation === "getList") {
                extractedData = professionals.data;
                extractedData.isLast = professionals.isLast;

            } else {
                extractedData = professionals;
            }
            return extractedData;
        });

````
## John Papa Style Guid

 [![Angular Patterns: Clean Code](https://raw.githubusercontent.com/johnpapa/angular-styleguide/master/assets/ng-clean-code-banner.png)](http://jpapa.me/ngclean)

## Lodash

https://lodash.com/docs

## Angular Bootstrap

https://angular-ui.github.io/