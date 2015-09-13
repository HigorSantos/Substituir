(function(window,document){

	window.onload = function(){

		/*
		* Cria os objetos do HTML
		*/
		var txtTexto 		= document.getElementById('texto');
		var txtEncontrar 	= document.getElementById('encontrar');
		var txtSubstituir 	= document.getElementById("substituir");
		var txtResultado 	= document.getElementById("resultado");
		var btnSub 			= document.getElementById('btnsub');
		var btnSub 			= document.getElementById('btnsub');
		var btnLimpar 		= document.getElementById('btnlimpar');
		var rbSubstituir_tudo	= document.getElementsByName("substituir_tudo");
		var lblMensagem 		= document.getElementById('mensagem');
		var btnEncontrarMais	= document.getElementById('abrir_mais');
		var btnadicionar_encontrar = document.getElementById('btnadicionar_encontrar');
		var lista_encontrar_mais = document.getElementById('lista_encontrar_mais');
		var lista_substituir_mais = document.getElementById('lista_substituir_mais');

		/*
		* Inicia valores
		*/
		rbSubstituir_tudo[0].checked = true;
		txtTexto.focus();

		/*
		* Executa a substituição quando clica no botão
		*/
		btnSub.onclick = function()
		{
			txtResultado.valu = "";

			if(	txtTexto.value!="" && txtTexto.value!=null
				&& txtEncontrar.value!="" && txtEncontrar.value!=null
				&& txtSubstituir.value!="" && txtSubstituir.value!=null){

				var encontrar = txtEncontrar.value;
				var substituido = txtTexto.value;
				
				if (i_campo==0){
					substituido = sub(txtTexto.value, encontrar, txtSubstituir.value, rbSubstituir_tudo[0].checked);
				}else{
					substituido = sub(txtTexto.value, encontrar, txtSubstituir.value, rbSubstituir_tudo[0].checked);


					for (var x = 1; x<=i_campo; x++){
						//Verifica se os campos realmente existem
						if (document.getElementById("encontrar_" + x)!=null && document.getElementById("substituir_" + x)!=null){
							var encontrar_x = document.getElementById("encontrar_" + x).value;
							var substituir_x = document.getElementById("substituir_" + x).value;

							substituido = sub(substituido, encontrar_x, substituir_x, rbSubstituir_tudo[0].checked);
						}
					}
				}

				//Exibe o resultado
				txtResultado.value = substituido;
			}
		}//FIM: btnSub.onclick

		function sub(texto, encontrar, substituir, tudo){
			var substituido = "";

			/*Verifica se é para substituir tudo*/
			if (tudo){
				//Adiciona o caracter de escape para caracteres especiais do regex
				encontrar = encontrar.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

				//Cria regex para substituris todas as aparições do texto que deve ser encontrador
				var re = new RegExp(encontrar, 'g');

				//Substitui
				substituido = texto.replace(re, substituir);

			}else{
				/*Ou substituir só a primeira aparição*/
				substituido = texto.replace(encontrar, substituir);
			}

			return substituido;
		}

		/*
		* Limpa todos os campos. ;)
		*/
		btnLimpar.onclick = function(){
			txtTexto.value = "";
			txtEncontrar.value = "";
			txtSubstituir.value = "";
			txtResultado.value = "";
			lblMensagem.innerHTML = "";
			lista_encontrar_mais.innerHTML = "";
			lista_substituir_mais.innerHTML = "";
			btnEncontrarMais.style.display = "block";
			document.getElementById("d_adicionar_encontrar").style.display = "none";

			i_campo=0;


			txtTexto.focus();
		}

		/*
		* Ao clicar no campo de resultado, copia no conteúdo para a área de transferência.
		*/
		txtResultado.onclick = function(event) {

			if (txtResultado.value!="" & txtResultado.value!=null){
				txtResultado.select();

				try {
					var successful = document.execCommand('copy');
					var msg = successful ? 'sucesso' : 'erro';
					console.log('Ao copiar o texto tivemos: ' + msg);
					lblMensagem.innerHTML = "Texto copiado para a Área de Transferência.";
				} catch (err) {
					console.log('Oops, erro ao copiar!');
				}
			}
		}//FIM: txtResultado.onclick

		/*
		* Habilita a inserção de mais de um campo de "encontrar"
		*/
		var i_campo = 0;
		btnEncontrarMais.onclick = function(){
			document.getElementById("d_adicionar_encontrar").style.display = "block";

			btnEncontrarMais.style.display = "none";

			adicionar_encontar();
		}

		/*
		* Adiciona mais um campo para Encontrar
		*/
		btnadicionar_encontrar.onclick = function(){
			adicionar_encontar();
		}

		function adicionar_encontar(){
			i_campo++;

			if (i_campo<=10){
				var campo_encontar, campo_substituir;

				campo_encontar = "<input type='text' id='encontrar_"+ i_campo +"' placeholder='Esse é o campo " + i_campo + " do encontrar.' />";
				campo_substituir = "<input type='text' id='substituir_"+ i_campo +"' placeholder='Esse é o campo de substituir nº" + i_campo + "' />";

				lista_encontrar_mais.innerHTML += campo_encontar;
				lista_substituir_mais.innerHTML += campo_substituir;

				document.getElementById("encontrar_"+ i_campo ).focus();
			}
		}

	}//FIM: onload
})(window,document);

/*
Fontes:
Copiar para área de trabalho: https://github.com/benjamingr/RegExp.escape
*/