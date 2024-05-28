---
title: 'Exceptions (Exceções) do .NET Framework'
date: Sat, 06 Oct 2012 19:36:32 +0000
draft: false
tags: ['ASP.NET', 'C#', 'csharp', 'Exception', 'Framework', 'Lista de Exceptions', 'MSDN', 'MSDN', 'Visual Studio']
---

Qual programador não se deparou com um erro que não estava previsto ocorrer em sua aplicação? Como por exemplo, quando atualizamos nossa aplicação e em um determinando clique ocorrer um _[ArgumentException](https://raphaelcardoso.com.br/csharp/exceptions-do-net-framework/#ArgumentException)_ ou então em um determinado calculo ocorrer um _[DivideByZeroException](https://raphaelcardoso.com.br/csharp/exceptions-do-net-framework/#DivideByZeroException)_.

Com o objetivo de facilitar a vida dos iniciantes que esse artigo irá listar alguns dos Exceptions existente no .NET Framework. Lembrando que poderão existir outros caso você esteja utilizando alguma biblioteca de terceiro como, por exemplo, um provider do _Sqlite_ ou _Firebird_.

Nessa lista você terá o Exception, a qual assembly ele pertence e a descrição na qual traduzi para facilitar. Clicando em cima do Exception, você será direcionado para o portal da _[MSDN](http://msdn.microsoft.com/pt-br/library/)_, mais especificamente para documentação do Exception clicado onde você terá acesso a hierarquia, sintaxe, construtores, propriedades métodos e eventos além de um breve comentário, exemplos e mais informações sobre a versão do Exception.

Caso encontre algum link quebrado, me informe para que possa corrigir.

Se algum Exception não foi incluído na lista, me informe nos comentários qual é para que possamos manter a lista atualizada.

### .NET Framework Exceptions

Exception

Assembly

Descrição

[AbandonedMutexException](http://msdn.microsoft.com/pt-br/library/system.threading.abandonedmutexexception.aspx)

mscorlib

A exceção que é acionada quando uma thread adquire um objeto System.Threading.Mutex que outro segmento abandonou por sair sem liberá-lo.

[AccessViolationException](http://msdn.microsoft.com/pt-br/library/system.accessviolationexception.aspx)

mscorlib

A exceção que é acionada quando há uma tentativa de leitura ou gravação em memória protegida.

[AmbiguousMatchException](http://msdn.microsoft.com/pt-br/library/system.reflection.ambiguousmatchexception.aspx)

mscorlib

A exceção que é lançada quando a ligação a um membro resulta em mais de um membro correspondente aos critérios de ligação. Esta classe não pode ser herdada.

[AppDomainUnloadedException](http://msdn.microsoft.com/pt-br/library/system.appdomainunloadedexception.aspx)

mscorlib

A exceção que é acionada quando é feita uma tentativa para acessar um domínio de aplicativo descarregado.

[ApplicationException](http://msdn.microsoft.com/pt-br/library/system.applicationexception.aspx)

mscorlib

A exceção que é lançada quando um erro de aplicação não-fatal.

[ArgumentException](http://msdn.microsoft.com/pt-br/library/system.argumentexception.aspx)

mscorlib

A exceção que é acionada quando um dos argumentos apresentados a um método não é válido.

[ArgumentNullException](http://msdn.microsoft.com/pt-br/library/system.argumentnullexception.aspx)

mscorlib

A exceção que é lançada quando uma referência nula é passada para um método que não aceitá-la como um argumento válido.

[ArgumentOutOfRangeException](http://msdn.microsoft.com/pt-br/library/system.argumentoutofrangeexception.aspx)

mscorlib

A exceção que é acionada quando o valor de um argumento está fora do intervalo de valores definidos pelo método invocado.

[ArithmeticException](http://msdn.microsoft.com/pt-br/library/system.arithmeticexception.aspx)

mscorlib

A exceção que é lançada para erros em uma operação aritmética, fundição, ou operação de conversão.

[ArrayTypeMismatchException](http://msdn.microsoft.com/pt-br/library/system.arraytypemismatchexception.aspx)

mscorlib

A exceção que é acionada quando é feita uma tentativa de armazenar um elemento do tipo errado dentro de uma matriz.

[BadImageFormatException](http://msdn.microsoft.com/pt-br/library/system.badimageformatexception.aspx)

mscorlib

A exceção que é lançada quando a imagem do arquivo de uma biblioteca de vínculo dinâmico (DLL) ou um programa executável é inválido.

[CannotUnloadAppDomainException](http://msdn.microsoft.com/pt-br/library/system.cannotunloadappdomainexception.aspx)

mscorlib

A exceção que é lançada quando uma tentativa de descarregar um domínio de aplicativo falha.

[COMException](http://msdn.microsoft.com/pt-br/library/system.runtime.interopservices.comexception.aspx)

mscorlib

A exceção que é acionada quando um HRESULT não reconhecido é retornado de uma chamada de método COM.

[ConstraintException](http://msdn.microsoft.com/pt-br/library/system.data.constraintexception.aspx)

System.Data

Representa a exceção que é acionada quando tentando uma ação que viola uma restrição.

[ContextMarshalException](http://msdn.microsoft.com/pt-br/library/system.contextmarshalexception.aspx)

mscorlib

A exceção que é lançada quando uma tentativa de empacotar um objeto em um limite de contexto falha.

[CryptographicException](http://msdn.microsoft.com/pt-br/library/system.security.cryptography.cryptographicexception.aspx)

mscorlib

A exceção que é lançada quando ocorre um erro durante uma operação de criptografia.

[CryptographicUnexpectedOperationException](http://msdn.microsoft.com/pt-br/library/system.security.cryptography.cryptographicunexpectedoperationexception.aspx)

mscorlib

A exceção que é lançada quando uma operação inesperada ocorre durante uma operação de criptografia.

[CustomAttributeFormatException](http://msdn.microsoft.com/pt-br/library/system.reflection.customattributeformatexception.aspx)

mscorlib

A exceção que é lançada quando o formato binário de um atributo personalizado é inválido.

[DataException](http://msdn.microsoft.com/pt-br/library/system.data.dataexception.aspx)

System.Data

Representa a exceção que é acionada quando os erros são gerados usando componentes ADO.NET.

[DataMisalignedException](http://msdn.microsoft.com/pt-br/library/system.datamisalignedexception.aspx)

mscorlib

A exceção que é acionada quando uma unidade de dados é lido ou gravado para um endereço que não é um múltiplo do tamanho de dados. Esta classe não pode ser herdada.

[DBConcurrencyException](http://msdn.microsoft.com/pt-br/library/system.data.dbconcurrencyexception.aspx)

System.Data

A exceção que é acionada pelo System.Data.Common.DataAdapter durante uma inserção, atualização ou exclusão se o número de linhas afetadas é igual a zero.

[DbException](http://msdn.microsoft.com/pt-br/library/system.data.common.dbexception.aspx)

System.Data

A classe base para todas as exceções lançadas em nome da fonte de dados.

[DecoderFallbackException](http://msdn.microsoft.com/pt-br/library/system.text.decoderfallbackexception.aspx)

mscorlib

A exceção que é lançada quando uma operação de retorno do decodificador falha. Esta classe não pode ser herdada.

[DeletedRowInaccessibleException](http://msdn.microsoft.com/pt-br/library/system.data.deletedrowinaccessibleexception.aspx)

System.Data

Representa a exceção que é acionada quando uma ação é tentada em um System.Data.DataRow que foi excluído.

[DirectoryNotFoundException](http://msdn.microsoft.com/pt-br/library/system.io.directorynotfoundexception.aspx)

mscorlib

A exceção que é acionada quando parte de um arquivo ou diretório não pode ser encontrado.

[DivideByZeroException](http://msdn.microsoft.com/pt-br/library/system.dividebyzeroexception.aspx)

mscorlib

A exceção que é acionada quando há uma tentativa de dividir um valor inteiro ou decimal por zero.

[DllNotFoundException](http://msdn.microsoft.com/pt-br/library/system.dllnotfoundexception.aspx)

mscorlib

A exceção que é acionada quando uma DLL especificada em uma importação de DLL não pode ser encontrado.

[DriveNotFoundException](http://msdn.microsoft.com/pt-br/library/system.io.drivenotfoundexception.aspx)

mscorlib

A exceção que é lançada ao tentar acessar uma unidade ou partes que não está disponível.

[DuplicateNameException](http://msdn.microsoft.com/pt-br/library/system.data.duplicatenameexception.aspx)

System.Data

Representa a exceção que é acionada quando um nome de banco de dados objeto duplicado for encontrado durante uma operação de adição em um objeto System.Data.DataSet-relacionados.

[DuplicateWaitObjectException](http://msdn.microsoft.com/pt-br/library/system.duplicatewaitobjectexception.aspx)

mscorlib

A exceção que é lançada quando um objeto aparece mais de uma vez em uma matriz de objetos de sincronização.

[EncoderFallbackException](http://msdn.microsoft.com/pt-br/library/system.text.encoderfallbackexception.aspx)

mscorlib

A exceção que é lançada quando uma operação de retorno do codificador falha. Esta classe não pode ser herdada.

[EndOfStreamException](http://msdn.microsoft.com/pt-br/library/system.io.endofstreamexception.aspx)

mscorlib

A exceção que é lançada quando a leitura é tentada após o final de um fluxo.

[EntryPointNotFoundException](http://msdn.microsoft.com/pt-br/library/system.entrypointnotfoundexception.aspx)

mscorlib

A exceção que é lançada quando uma tentativa de carregar uma classe falhar devido à ausência de um método de entrada.

[EvaluateException](http://msdn.microsoft.com/pt-br/library/system.data.evaluateexception.aspx)

System.Data

Representa a exceção que é acionada quando a propriedade de um System.Data.DataColumn.Expression System.Data.DataColumn não pode ser avaliada.

[ExecutionEngineException](http://msdn.microsoft.com/pt-br/library/system.executionengineexception.aspx)

mscorlib

A exceção que é acionada quando há um erro interno no mecanismo de execução do tempo de execução de linguagem comum. Esta classe não pode ser herdada.

[ExternalException](http://msdn.microsoft.com/pt-br/library/system.runtime.interopservices.externalexception.aspx)

mscorlib

O tipo de exceção de base para todas as exceções de interoperabilidade COM e manipulação de exceção estruturada (SEH) exceções.

[FieldAccessException](http://msdn.microsoft.com/pt-br/library/system.fieldaccessexception.aspx)

mscorlib

A exceção que é lançada quando há uma tentativa inválida de acessar um campo particular ou protegido dentro de uma classe.

[FileLoadException](http://msdn.microsoft.com/pt-br/library/system.io.fileloadexception.aspx)

mscorlib

A exceção que é acionada quando um assembly gerenciado for encontrado, mas não pode ser carregado.

[FileNotFoundException](http://msdn.microsoft.com/pt-br/library/system.io.filenotfoundexception.aspx)

mscorlib

A exceção que é lançada quando uma tentativa de acessar um arquivo que não existe no disco falha.

[FormatException](http://msdn.microsoft.com/pt-br/library/system.formatexception.aspx)

mscorlib

A exceção que é lançada quando o formato de um argumento não atende as especificações de parâmetro do método invocado.

[HostProtectionException](http://msdn.microsoft.com/pt-br/library/system.security.hostprotectionexception.aspx)

mscorlib

A exceção que é acionada quando um recurso de host negado é detectado.

[IdentityNotMappedException](http://msdn.microsoft.com/pt-br/library/system.security.principal.identitynotmappedexception.aspx)

mscorlib

Representa uma exceção para um diretor cuja identidade não pôde ser mapeada para uma identidade conhecida.

[IndexOutOfRangeException](http://msdn.microsoft.com/pt-br/library/system.indexoutofrangeexception.aspx)

mscorlib

A exceção que é acionada quando é feita uma tentativa para acessar um elemento de uma matriz com um índice que está fora dos limites da matriz. Esta classe não pode ser herdada.

[InRowChangingEventException](http://msdn.microsoft.com/pt-br/library/system.data.inrowchangingeventexception.aspx)

System.Data

Representa a exceção que é acionada quando você chama o método System.Data.DataRow.EndEdit dentro do evento System.Data.DataTable.RowChanging.

[InsufficientMemoryException](http://msdn.microsoft.com/pt-br/library/system.insufficientmemoryexception.aspx)

mscorlib

A exceção que é acionada quando um cheque de memória disponível suficiente falha. Esta classe não pode ser herdada.

[InvalidCastException](http://msdn.microsoft.com/pt-br/library/system.invalidcastexception.aspx)

mscorlib

A exceção que é lançada para operação de cast ou de conversão explícita inválida.

[InvalidComObjectException](http://msdn.microsoft.com/pt-br/library/system.runtime.interopservices.invalidcomobjectexception.aspx)

mscorlib

A exceção lançada quando um objeto COM inválido é usado.

[InvalidConstraintException](http://msdn.microsoft.com/pt-br/library/system.data.invalidconstraintexception.aspx)

System.Data

Representa a exceção que é acionada quando incorretamente tentando criar ou acessar uma relação.

[InvalidExpressionException](http://msdn.microsoft.com/pt-br/library/system.data.invalidexpressionexception.aspx)

System.Data

Representa a exceção que é lançada quando você tenta adicionar um System.Data.DataColumn que contém um System.Data.DataColumn.Expression inválido para um System.Data.DataColumnCollection.

[InvalidFilterCriteriaException](http://msdn.microsoft.com/pt-br/library/system.reflection.invalidfiltercriteriaexception.aspx)

mscorlib

A exceção é acionada em FindMembers quando os critérios de filtro não é válido para o tipo de filtro que você está usando.

[InvalidOleVariantTypeException](http://msdn.microsoft.com/pt-br/library/system.runtime.interopservices.invalidolevarianttypeexception.aspx)

mscorlib

A exceção lançada pelo empacotador quando encontra um argumento de um tipo variante que não pode ser empacotado para código gerenciado.

[InvalidOperationException](http://msdn.microsoft.com/pt-br/library/system.invalidoperationexception.aspx)

mscorlib

A exceção que é acionada quando uma chamada de método não é válido para o estado atual do objeto.

[InvalidProgramException](http://msdn.microsoft.com/pt-br/library/system.invalidprogramexception.aspx)

mscorlib

A exceção que é acionada quando um programa contém inválido Microsoft Intermediate Language (MSIL) ou metadados. Geralmente isso indica um erro no compilador que gerou o programa.

[InvalidUdtException](http://msdn.microsoft.com/pt-br/library/microsoft.sqlserver.server.invalidudtexception.aspx)

System.Data

Lançada quando o SQL Server ou o provedor System.Data.SqlClient ADO.NET detecta um tipo inválido definido pelo usuário (UDT).

[IOException](http://msdn.microsoft.com/pt-br/library/system.io.ioexception.aspx)

mscorlib

A exceção que é lançada quando um erro de I/O ocorre.

[IsolatedStorageException](http://msdn.microsoft.com/pt-br/library/system.io.isolatedstorage.isolatedstorageexception.aspx)

mscorlib

A exceção que é lançada quando uma operação no armazenamento isolado falha.

[KeyNotFoundException](http://msdn.microsoft.com/pt-br/library/system.collections.generic.keynotfoundexception.aspx)

mscorlib

A exceção que é acionada quando a chave especificada para acessar um elemento em uma coleção não corresponde a qualquer chave na coleção.

[MarshalDirectiveException](http://msdn.microsoft.com/pt-br/library/system.runtime.interopservices.marshaldirectiveexception.aspx)

mscorlib

A exceção que é acionada pelo empacotador quando encontra um System.Runtime.InteropServices.MarshalAsAttribute ele não suporta.

[MemberAccessException](http://msdn.microsoft.com/pt-br/library/system.memberaccessexception.aspx)

mscorlib

A exceção que é lançada quando uma tentativa de acessar um membro de classe falhar.

[MethodAccessException](http://msdn.microsoft.com/pt-br/library/system.methodaccessexception.aspx)

mscorlib

A exceção que é acionada quando há uma tentativa inválida de acessar um método, como acessar um método particular de código parcialmente confiáveis.

[MissingFieldException](http://msdn.microsoft.com/pt-br/library/system.missingfieldexception.aspx)

mscorlib

A exceção que é lançada quando há uma tentativa de acessar dinamicamente um campo que não existe.

[MissingManifestResourceException](http://msdn.microsoft.com/pt-br/library/system.resources.missingmanifestresourceexception.aspx)

mscorlib

A exceção lançada se o conjunto principal não contém os recursos para a cultura neutra, e eles são necessários por causa de um assembly satélite apropriado ausente.

[MissingMemberException](http://msdn.microsoft.com/pt-br/library/system.missingmemberexception.aspx)

mscorlib

A exceção que é lançada quando há uma tentativa de acessar dinamicamente um membro da classe que não existe.

[MissingMethodException](http://msdn.microsoft.com/pt-br/library/system.missingmethodexception.aspx)

mscorlib

A exceção que é lançada quando há uma tentativa de acessar dinamicamente um método que não existe.

[MissingPrimaryKeyException](http://msdn.microsoft.com/pt-br/library/system.data.missingprimarykeyexception.aspx)

System.Data

Representa a exceção que é lançada quando você tenta acessar uma linha em uma tabela que não tem chave primária.

[MissingSatelliteAssemblyException](http://msdn.microsoft.com/pt-br/library/system.resources.missingsatelliteassemblyexception.aspx)

mscorlib

A exceção que é acionada quando o conjunto de satélite para os recursos da cultura neutra está faltando.

[MulticastNotSupportedException](http://msdn.microsoft.com/pt-br/library/system.multicastnotsupportedexception.aspx)

mscorlib

A exceção que é acionada quando há uma tentativa de combinar dois delegados com base no tipo System.Delegate em vez do tipo System.MulticastDelegate. Esta classe não pode ser herdada.

[NoNullAllowedException](http://msdn.microsoft.com/pt-br/library/system.data.nonullallowedexception.aspx)

System.Data

Representa a exceção que é lançada quando você tenta inserir um valor nulo em uma coluna onde System.Data.DataColumn.AllowDBNull é definido como falso.

[NotFiniteNumberException](http://msdn.microsoft.com/pt-br/library/system.notfinitenumberexception.aspx)

mscorlib

A exceção que é lançada quando um valor de ponto flutuante é infinito positivo, negativo infinito, ou não é um número (NaN).

[NotImplementedException](http://msdn.microsoft.com/pt-br/library/system.notimplementedexception.aspx)

mscorlib

A exceção que é acionada quando um método ou operação solicitada não está implementada.

[NotSupportedException](http://msdn.microsoft.com/pt-br/library/system.notsupportedexception.aspx)

mscorlib

A exceção que é acionada quando um método chamado não é suportado, ou quando há uma tentativa de ler, procurar, ou escrever para um fluxo que não suporta a funcionalidade invocada.

[NullReferenceException](http://msdn.microsoft.com/pt-br/library/system.nullreferenceexception.aspx)

mscorlib

A exceção que é acionada quando há uma tentativa de dereference uma referência de objeto nula.

[ObjectDisposedException](http://msdn.microsoft.com/pt-br/library/system.objectdisposedexception.aspx)

mscorlib

A exceção que é lançada quando uma operação é executada em um objeto descartado.

[OdbcException](http://msdn.microsoft.com/pt-br/library/system.data.odbc.odbcexception.aspx)

System.Data

A exceção que é gerada quando um aviso ou erro é retornada por uma fonte de dados ODBC. Esta classe não pode ser herdada.

[OleDbException](http://msdn.microsoft.com/pt-br/library/system.data.oledb.oledbexception.aspx)

System.Data

A exceção que é lançada quando o provedor subjacente retorna um aviso ou erro de uma fonte de dados OLE DB. Esta classe não pode ser herdada.

[OperationAbortedException](http://msdn.microsoft.com/pt-br/library/system.data.operationabortedexception.aspx)

System.Data

Essa exceção é lançada quando uma operação em andamento é abortada pelo usuário.

[OperationCanceledException](http://msdn.microsoft.com/pt-br/library/system.operationcanceledexception.aspx)

mscorlib

A exceção que é lançada em um segmento com o cancelamento de uma operação que o fio estava sendo executado.

[OracleException](http://msdn.microsoft.com/pt-br/library/system.data.oracleclient.oracleexception.aspx)

System.Data.OracleClient

A exceção que é gerada quando um aviso ou erro é retornado por um banco de dados Oracle ou o. NET Framework Data Provider para Oracle. Esta classe não pode ser herdada.

[OutOfMemoryException](http://msdn.microsoft.com/pt-br/library/system.outofmemoryexception.aspx)

mscorlib

A exceção que é lançada quando não há memória suficiente para continuar a execução de um programa.

[OverflowException](http://msdn.microsoft.com/pt-br/library/system.overflowexception.aspx)

mscorlib

A exceção que é lançada quando uma operação aritmética, casting, ou a conversão em um contexto de resultados verificados em um estouro.

[PathTooLongException](http://msdn.microsoft.com/pt-br/library/system.io.pathtoolongexception.aspx)

mscorlib

A exceção que é acionada quando um caminho ou nome do arquivo é maior do que o sistema de comprimento máximo definido.

[PlatformNotSupportedException](http://msdn.microsoft.com/pt-br/library/system.platformnotsupportedexception.aspx)

mscorlib

A exceção que é acionada quando um recurso não é executado em uma plataforma específica.

[PolicyException](http://msdn.microsoft.com/pt-br/library/system.security.policy.policyexception.aspx)

mscorlib

A exceção que é lançada quando a política proíbe a execução de código.

[PrivilegeNotHeldException](http://msdn.microsoft.com/pt-br/library/system.security.accesscontrol.privilegenotheldexception.aspx)

mscorlib

A exceção que é acionada quando um método no namespace System.Security.AccessControl tenta ativar um privilégio que ele não tem.

[RankException](http://msdn.microsoft.com/pt-br/library/system.rankexception.aspx)

mscorlib

A exceção que é acionada quando uma matriz com o número errado de dimensões é passada para um método.

[ReadOnlyException](http://msdn.microsoft.com/pt-br/library/system.data.readonlyexception.aspx)

System.Data

Representa a exceção que é acionada quando você tentar alterar o valor de uma coluna somente leitura.

[ReflectionTypeLoadException](http://msdn.microsoft.com/pt-br/library/system.reflection.reflectiontypeloadexception.aspx)

mscorlib

A exceção que é lançada pelo método System.Reflection.Module.GetTypes se qualquer uma das classes em um módulo não pode ser carregado. Esta classe não pode ser herdada.

[RemotingException](http://msdn.microsoft.com/pt-br/library/system.runtime.remoting.remotingexception.aspx)

mscorlib

A exceção que é acionada quando algo deu errado durante a comunicação remota.

[RemotingTimeoutException](http://msdn.microsoft.com/pt-br/library/system.runtime.remoting.remotingtimeoutexception.aspx)

mscorlib

A exceção que é acionada quando o servidor ou o cliente não pode ser alcançado por um período previamente especificado de tempo.

[RowNotInTableException](http://msdn.microsoft.com/pt-br/library/system.data.rownotintableexception.aspx)

System.Data

Representa a exceção que é lançada quando você tenta executar uma operação em um System.Data.DataRow que não está em um System.Data.DataTable.

[RuntimeWrappedException](http://msdn.microsoft.com/pt-br/library/system.runtime.compilerservices.runtimewrappedexception.aspx)

mscorlib

Envolve uma exceção que não derivam da classe System.Exception. Esta classe não pode ser herdada.

[SafeArrayRankMismatchException](http://msdn.microsoft.com/pt-br/library/system.runtime.interopservices.safearrayrankmismatchexception.aspx)

mscorlib

A exceção lançada quando o nível de um SEGURA de entrada não corresponde a classificação especificada na assinatura gerenciado.

[SafeArrayTypeMismatchException](http://msdn.microsoft.com/pt-br/library/system.runtime.interopservices.safearraytypemismatchexception.aspx)

mscorlib

A exceção lançada quando o tipo de SAFEARRAY entrada não coincide com o tipo especificado na assinatura gerenciado.

[SecurityException](http://msdn.microsoft.com/pt-br/library/system.security.securityexception.aspx)

mscorlib

A exceção que é lançada quando um erro de segurança é detectado.

[SEHException](http://msdn.microsoft.com/pt-br/library/system.runtime.interopservices.sehexception.aspx)

mscorlib

Representa exceção estruturada Handler (SEH) erros.

[SerializationException](http://msdn.microsoft.com/pt-br/library/system.runtime.serialization.serializationexception.aspx)

mscorlib

A exceção lançada quando ocorre um erro durante a serialização ou desserialização.

[ServerException](http://msdn.microsoft.com/pt-br/library/system.runtime.remoting.serverexception.aspx)

mscorlib

A exceção que é lançada para se comunicar erros para o cliente quando o cliente liga para aplicações não-.NET Framework que não podem lançar exceções.

[SqlAlreadyFilledException](http://msdn.microsoft.com/pt-br/library/system.data.sqltypes.sqlalreadyfilledexception.aspx)

System.Data

A classe System.Data.SqlTypes.SqlAlreadyFilledException não se destina a utilização como um componente independente, mas como uma classe da qual outras classes derivem funcionalidade padrão.

[SqlException](http://msdn.microsoft.com/pt-br/library/system.data.sqlclient.sqlexception.aspx)

System.Data

A exceção que é acionada quando o SQL Server retorna um aviso ou erro. Esta classe não pode ser herdada.

[SqlNotFilledException](http://msdn.microsoft.com/pt-br/library/system.data.sqltypes.sqlnotfilledexception.aspx)

System.Data

A classe System.Data.SqlTypes.SqlNotFilledException não se destina a utilização como um componente independente, mas como uma classe da qual outras classes derivem funcionalidade padrão.

[SqlNullValueException](http://msdn.microsoft.com/pt-br/library/system.data.sqltypes.sqlnullvalueexception.aspx)

System.Data

A exceção que é acionada quando a propriedade de valor de uma estrutura System.Data.SqlTypes é definido como nulo.

[SqlTruncateException](http://msdn.microsoft.com/pt-br/library/system.data.sqltypes.sqltruncateexception.aspx)

System.Data

A exceção que é acionada quando você definir um valor em uma estrutura System.Data.SqlTypes seria truncar esse valor.

[SqlTypeException](http://msdn.microsoft.com/pt-br/library/system.data.sqltypes.sqltypeexception.aspx)

System.Data

A classe de exceção base para os System.Data.SqlTypes.

[StackOverflowException](http://msdn.microsoft.com/pt-br/library/system.stackoverflowexception.aspx)

mscorlib

A exceção que é acionada quando os estouros de pilha de execução, pois contém muitas chamadas de método aninhadas. Esta classe não pode ser herdada.

[StrongTypingException](http://msdn.microsoft.com/pt-br/library/system.data.strongtypingexception.aspx)

System.Data

A exceção que é lançada por um System.Data.DataSet rigidez quando o usuário acessa um valor DBNull.

[SynchronizationLockException](http://msdn.microsoft.com/pt-br/library/system.threading.synchronizationlockexception.aspx)

mscorlib

A exceção que é acionada quando um método requer que o chamador possui o bloqueio em um determinado Monitor, eo método é chamado por um chamador que não possui esse bloqueio.

[SyntaxErrorException](http://msdn.microsoft.com/pt-br/library/system.data.syntaxerrorexception.aspx)

System.Data

Representa a exceção que é acionada quando a propriedade de um System.Data.DataColumn.Expression System.Data.DataColumn contém um erro de sintaxe.

[SystemException](http://msdn.microsoft.com/pt-br/library/system.systemexception.aspx)

mscorlib

Define a classe base para exceções predefinidas no namespace System.

[TargetException](http://msdn.microsoft.com/pt-br/library/system.reflection.targetexception.aspx)

mscorlib

Representa a exceção que é acionada quando é feita uma tentativa para chamar um destino inválido.

[TargetInvocationException](http://msdn.microsoft.com/pt-br/library/system.reflection.targetinvocationexception.aspx)

mscorlib

A exceção que é lançada por métodos chamados por reflexão. Esta classe não pode ser herdada.

[TargetParameterCountException](http://msdn.microsoft.com/pt-br/library/system.reflection.targetparametercountexception.aspx)

mscorlib

A exceção que é acionada quando o número de parâmetros para uma invocação não corresponde ao número esperado. Esta classe não pode ser herdada.

[ThreadAbortException](http://msdn.microsoft.com/pt-br/library/system.threading.threadabortexception.aspx)

mscorlib

A exceção que é acionada quando é feita uma chamada ao método System.Threading.Thread.Abort(System.Object). Esta classe não pode ser herdada.

[ThreadInterruptedException](http://msdn.microsoft.com/pt-br/library/system.threading.threadinterruptedexception.aspx)

mscorlib

A exceção que é acionada quando um System.Threading.Thread é interrompido enquanto ele está em um estado de espera.

[ThreadStartException](http://msdn.microsoft.com/pt-br/library/system.threading.threadstartexception.aspx)

mscorlib

A exceção que é lançada quando ocorre uma falha em um segmento gerenciado após o segmento do sistema operacional subjacente foi iniciado, mas antes que o segmento está pronto para executar o código do usuário.

[ThreadStateException](http://msdn.microsoft.com/pt-br/library/system.threading.threadstateexception.aspx)

mscorlib

A exceção que é acionada quando um System.Threading.Thread está em um System.Threading.Thread.ThreadState inválido para chamar o método.

[TimeoutException](http://msdn.microsoft.com/pt-br/library/system.timeoutexception.aspx)

mscorlib

A exceção que é acionada quando o tempo alocado para um processo ou operação expirou.

[TypedDataSetGeneratorException](http://msdn.microsoft.com/pt-br/library/system.data.typeddatasetgeneratorexception.aspx)

System.Data

A exceção que é lançada quando ocorre um conflito de nome ao gerar um System.Data.DataSet rigidez.

[TypeInitializationException](http://msdn.microsoft.com/pt-br/library/system.typeinitializationexception.aspx)

mscorlib

A exceção que é lançada como um invólucro em torno a exceção lançada pelo inicializador de classe. Esta classe não pode ser herdada.

[TypeLoadException](http://msdn.microsoft.com/pt-br/library/system.typeloadexception.aspx)

mscorlib

A exceção que é lançada quando o tipo de carregamento de ocorrência de falhas.

[TypeUnloadedException](http://msdn.microsoft.com/pt-br/library/system.typeunloadedexception.aspx)

mscorlib

A exceção que é acionada quando há uma tentativa de acessar uma classe de carga.

[UnauthorizedAccessException](http://msdn.microsoft.com/pt-br/library/system.unauthorizedaccessexception.aspx)

mscorlib

A exceção que é acionada quando o sistema operacional nega acesso devido a um erro de I/O ou um tipo específico de erro de segurança.

[VerificationException](http://msdn.microsoft.com/pt-br/library/system.security.verificationexception.aspx)

mscorlib

A exceção que é lançada quando a política de segurança requer um código para ser seguro tipo e do processo de verificação é possível verificar que o código é o tipo de seguro.

[VersionNotFoundException](http://msdn.microsoft.com/pt-br/library/system.data.versionnotfoundexception.aspx)

System.Data

Representa a exceção que é acionada quando você tentar retornar uma versão de um System.Data.DataRow que foi excluído.

[WaitHandleCannotBeOpenedException](http://msdn.microsoft.com/pt-br/library/system.threading.waithandlecannotbeopenedexception.aspx)

mscorlib

A exceção que é acionada quando é feita uma tentativa de abrir um mutex sistema ou semáforo que não existe.

[XmlSyntaxException](http://msdn.microsoft.com/pt-br/library/system.security.xmlsyntaxexception.aspx)

mscorlib

A exceção que é acionada quando há um erro de sintaxe na análise XML. Esta classe não pode ser herdada.