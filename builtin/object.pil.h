external class gelly::builtin::object::reflect::DefineMethodsClassInfo extends pil::reflect::Class {
    pil::reflect::Class getSuperClass ( ) ;
    pil::String getQualifiedId ( ) ;
    pil::Array < pil::reflect::Field > getFields ( ) ;
    pil::Array < pil::reflect::Method > getMethods ( ) ;
}
external pil::reflect::Class gelly::builtin::object::reflect::typeOfDefineMethods ( ) ;
external class gelly::builtin::object::reflect::PrintMethodClassInfo extends pil::reflect::Class {
    pil::reflect::Class getSuperClass ( ) ;
    pil::String getQualifiedId ( ) ;
    pil::Array < pil::reflect::Field > getFields ( ) ;
    pil::Array < pil::reflect::Method > getMethods ( ) ;
}
external pil::reflect::Class gelly::builtin::object::reflect::typeOfPrintMethod ( ) ;
external class gelly::builtin::object::reflect::DescribeMethodClassInfo extends pil::reflect::Class {
    pil::reflect::Class getSuperClass ( ) ;
    pil::String getQualifiedId ( ) ;
    pil::Array < pil::reflect::Field > getFields ( ) ;
    pil::Array < pil::reflect::Method > getMethods ( ) ;
}
external pil::reflect::Class gelly::builtin::object::reflect::typeOfDescribeMethod ( ) ;
external class gelly::builtin::object::reflect::GetFieldMethodClassInfo extends pil::reflect::Class {
    pil::reflect::Class getSuperClass ( ) ;
    pil::String getQualifiedId ( ) ;
    pil::Array < pil::reflect::Field > getFields ( ) ;
    pil::Array < pil::reflect::Method > getMethods ( ) ;
}
external pil::reflect::Class gelly::builtin::object::reflect::typeOfGetFieldMethod ( ) ;
external class gelly::builtin::object::reflect::SetFieldMethodClassInfo extends pil::reflect::Class {
    pil::reflect::Class getSuperClass ( ) ;
    pil::String getQualifiedId ( ) ;
    pil::Array < pil::reflect::Field > getFields ( ) ;
    pil::Array < pil::reflect::Method > getMethods ( ) ;
}
external pil::reflect::Class gelly::builtin::object::reflect::typeOfSetFieldMethod ( ) ;
external class gelly::builtin::object::reflect::NewInstanceMethodClassInfo extends pil::reflect::Class {
    pil::reflect::Class getSuperClass ( ) ;
    pil::String getQualifiedId ( ) ;
    pil::Array < pil::reflect::Field > getFields ( ) ;
    pil::Array < pil::reflect::Method > getMethods ( ) ;
}
external pil::reflect::Class gelly::builtin::object::reflect::typeOfNewInstanceMethod ( ) ;
external pil::reflect::Class gelly::reflect::typeOfGLString ( ) ;
external pil::reflect::Class gelly::reflect::typeOfGLMethod ( ) ;
external pil::reflect::Class gelly::reflect::typeOfGLClass ( ) ;
external pil::reflect::Class gelly::reflect::typeOfGLObject ( ) ;
external pil::reflect::Class gelly::exception::reflect::typeOfNoSuchMethodException ( ) ;
external pil::reflect::Class gelly::exception::reflect::typeOfNoSuchFieldException ( ) ;
external pil::reflect::Class gelly::reflect::typeOfEnv ( ) ;
external pil::reflect::Class gelly::reflect::typeOfIdnTerm ( ) ;
external pil::reflect::Class gelly::reflect::typeOfStringTerm ( ) ;
external pil::reflect::Class gelly::reflect::typeOfIntTerm ( ) ;
external pil::reflect::Class gelly::reflect::typeOfAssignTerm ( ) ;
external pil::reflect::Class gelly::reflect::typeOfMethodDefTerm ( ) ;
external pil::reflect::Class gelly::reflect::typeOfBlockTerm ( ) ;
external pil::reflect::Class gelly::reflect::typeOfMessageSendTerm ( ) ;
external pil::reflect::Class gelly::reflect::typeOfTerm ( ) ;
external pil::reflect::Class gelly::builtin::string::reflect::typeOfStringConcatMethod ( ) ;
external pil::reflect::Class gelly::builtin::int::reflect::typeOfAddMethod ( ) ;
external pil::reflect::Class gelly::reflect::typeOfGLInt ( ) ;
external pil::reflect::Class pil::reflect::reflect::typeOfField ( ) ;
external pil::reflect::Class pil::reflect::reflect::typeOfMethod ( ) ;
external pil::reflect::Class pil::reflect::reflect::typeOfParameterClass ( ) ;
external pil::reflect::Class pil::reflect::reflect::typeOfGenericClass ( ) ;
external pil::reflect::Class pil::reflect::reflect::typeOfClass ( ) ;
external pil::reflect::Class pil::reflect::typeOfFunction4 ( ) ;
external pil::reflect::Class pil::reflect::typeOfFunction3 ( ) ;
external pil::reflect::Class pil::reflect::typeOfFunction2 ( ) ;
external pil::reflect::Class pil::reflect::typeOfFunction1 ( ) ;
external pil::reflect::Class pil::reflect::typeOfFunction0 ( ) ;
external pil::reflect::Class pil::reflect::typeOfNullPointerException ( ) ;
external pil::reflect::Class pil::reflect::typeOfException ( ) ;
external pil::reflect::Class pil::reflect::typeOfMap ( ) ;
external pil::reflect::Class pil::reflect::typeOfSet ( ) ;
external pil::reflect::Class pil::reflect::typeOfList ( ) ;
external pil::reflect::Class pil::reflect::typeOfExpandingCollection ( ) ;
external pil::reflect::Class pil::reflect::typeOfArray ( ) ;
external pil::reflect::Class pil::reflect::typeOfCollection ( ) ;
external pil::reflect::Class pil::reflect::typeOfMutableString ( ) ;
external pil::reflect::Class pil::reflect::typeOfString ( ) ;
external pil::reflect::Class pil::reflect::typeOfDateTime ( ) ;
external pil::reflect::Class pil::reflect::typeOfByte ( ) ;
external pil::reflect::Class pil::reflect::typeOfChar ( ) ;
external pil::reflect::Class pil::reflect::typeOfFloat ( ) ;
external pil::reflect::Class pil::reflect::typeOfInt ( ) ;
external pil::reflect::Class pil::reflect::typeOfNumeric ( ) ;
external pil::reflect::Class pil::reflect::typeOfBool ( ) ;
external pil::reflect::Class reflect::typeOfNone ( ) ;
external pil::reflect::Class pil::reflect::typeOfObject ( ) ;
external class gelly::GLInt extends gelly::GLObject {
    pil::Int value ;
    new ( pil::Int value ) ;
    as<pil::String>;
}
external gelly::GLClass gelly::builtin::int::init ( ) ;
external class gelly::builtin::int::AddMethod extends gelly::GLMethod {
    new ( ) ;
    gelly::GLObject invoke ( gelly::GLObject o , pil::Array < gelly::GLObject > args ) ;
}
external gelly::GLClass gelly::builtin::string::init ( ) ;
external class gelly::builtin::string::StringConcatMethod extends gelly::GLMethod {
    new ( ) ;
    gelly::GLObject invoke ( gelly::GLObject o , pil::Array < gelly::GLObject > args ) ;
}
external class gelly::Term extends pil::Object {
    pil::String toIndentedString ( pil::Int depth ) ;
}
external pil::String gelly::util::spaces ( pil::Int n ) ;
external class gelly::MessageSendTerm extends gelly::Term {
    gelly::Term object ;
    pil::String message ;
    pil::Array < gelly::Term > arguments ;
    new ( gelly::Term object , pil::String message , pil::Array < gelly::Term > arguments ) ;
    pil::String toIndentedString ( pil::Int depth ) ;
    as<pil::String>;
}
external class gelly::BlockTerm extends gelly::Term {
    pil::Array < gelly::Term > statements ;
    new ( pil::Array < gelly::Term > statements ) ;
    pil::String toIndentedString ( pil::Int depth ) ;
    as<pil::String>;
}
external class gelly::MethodDefTerm extends gelly::Term {
    gelly::MessageSendTerm signature ;
    pil::Array < gelly::Term > statements ;
    new ( gelly::MessageSendTerm signature , pil::Array < gelly::Term > statements ) ;
    pil::String toIndentedString ( pil::Int depth ) ;
    as<pil::String>;
}
external class gelly::AssignTerm extends gelly::Term {
    gelly::Term lhs ;
    gelly::Term value ;
    new ( gelly::Term lhs , gelly::Term value ) ;
    pil::String toIndentedString ( pil::Int depth ) ;
}
external class gelly::IntTerm extends gelly::Term {
    pil::Int value ;
    new ( pil::Int value ) ;
    pil::Bool == ( pil::Object o ) ;
    as<pil::String>;
}
external class gelly::StringTerm extends gelly::Term {
    pil::String value ;
    new ( pil::String value ) ;
    pil::Bool == ( pil::Object o ) ;
    as<pil::String>;
}
external class gelly::IdnTerm extends gelly::Term {
    pil::String idn ;
    new ( pil::String idn ) ;
    as<pil::String>;
}
external pil::Map < pil::String , gelly::GLClass > gelly::rootNamespace ;
external void gelly::initInterpreter ( ) ;
external class gelly::Env extends pil::Object {
    gelly::GLObject self ;
    pil::Map < pil::String , gelly::GLObject > variables ;
    gelly::GLObject returnValue ;
    new ( gelly::GLObject self ) ;
    gelly::GLObject lookupVar ( pil::String var ) ;
    void evalBlock ( gelly::Term stats ) ;
    gelly::GLObject evalStatement ( gelly::Term stat ) ;
    gelly::GLObject evalExp ( gelly::Term exp ) ;
}
external class gelly::exception::NoSuchFieldException extends pil::Exception {
    new ( pil::String field ) ;
}
external class gelly::exception::NoSuchMethodException extends pil::Exception {
    new ( pil::String method ) ;
}
external class gelly::GLObject extends pil::Object {
    gelly::GLClass cls ;
    pil::Map < pil::String , gelly::GLMethod > methods ;
    pil::Map < pil::String , gelly::GLObject > fields ;
    new ( gelly::GLClass cls ) ;
    gelly::GLMethod getMethod ( pil::String selector ) ;
    gelly::GLObject getField ( pil::String name ) ;
    void setField ( pil::String name , gelly::GLObject value ) ;
    as<pil::String>;
}
external class gelly::GLClass extends gelly::GLObject {
    gelly::GLClass superClass ;
    pil::String name ;
    pil::Map < pil::String , gelly::GLMethod > instanceMethods ;
    new ( gelly::GLClass superClass , pil::String name ) ;
    gelly::GLMethod getMethod ( pil::String selector ) ;
}
external class gelly::GLMethod extends gelly::GLObject {
    pil::Array < pil::String > argumentNames ;
    gelly::BlockTerm block ;
    pil::String selector ;
    new ( pil::String selector , pil::Array < pil::String > argumentNames , gelly::BlockTerm block ) ;
    gelly::GLObject invoke ( gelly::GLObject self , pil::Array < gelly::GLObject > args ) ;
}
external class gelly::GLString extends gelly::GLObject {
    pil::String value ;
    new ( pil::String value ) ;
    as<pil::String>;
}
external gelly::GLClass gelly::builtin::object::init ( ) ;
external class gelly::builtin::object::NewInstanceMethod extends gelly::GLMethod {
    new ( ) ;
    gelly::GLObject invoke ( gelly::GLObject o , pil::Array < gelly::GLObject > args ) ;
    pil::reflect::Class getClassInfo ( ) ;
}
external class gelly::builtin::object::SetFieldMethod extends gelly::GLMethod {
    new ( ) ;
    gelly::GLObject invoke ( gelly::GLObject o , pil::Array < gelly::GLObject > args ) ;
    pil::reflect::Class getClassInfo ( ) ;
}
external class gelly::builtin::object::GetFieldMethod extends gelly::GLMethod {
    new ( ) ;
    gelly::GLObject invoke ( gelly::GLObject o , pil::Array < gelly::GLObject > args ) ;
    pil::reflect::Class getClassInfo ( ) ;
}
external class gelly::builtin::object::DescribeMethod extends gelly::GLMethod {
    new ( ) ;
    gelly::GLObject invoke ( gelly::GLObject o , pil::Array < gelly::GLObject > args ) ;
    pil::reflect::Class getClassInfo ( ) ;
}
external class gelly::builtin::object::PrintMethod extends gelly::GLMethod {
    new ( ) ;
    gelly::GLObject invoke ( gelly::GLObject o , pil::Array < gelly::GLObject > args ) ;
    pil::reflect::Class getClassInfo ( ) ;
}
external class gelly::builtin::object::DefineMethods extends gelly::GLMethod {
    pil::Bool instanceMethods ;
    new ( pil::Bool instanceMethods ) ;
    gelly::GLObject invoke ( gelly::GLObject self , pil::Array < gelly::GLObject > args ) ;
    pil::reflect::Class getClassInfo ( ) ;
    pil::Bool getInstanceMethods ( ) ;
    void setInstanceMethods ( pil::Bool value ) ;
}