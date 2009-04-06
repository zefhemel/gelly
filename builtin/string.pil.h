external class gelly::builtin::string::reflect::StringConcatMethodClassInfo extends pil::reflect::Class {
    pil::reflect::Class getSuperClass ( ) ;
    pil::String getQualifiedId ( ) ;
    pil::Array < pil::reflect::Field > getFields ( ) ;
    pil::Array < pil::reflect::Method > getMethods ( ) ;
}
external pil::reflect::Class gelly::builtin::string::reflect::typeOfStringConcatMethod ( ) ;
external pil::reflect::Class gelly::reflect::typeOfGLString ( ) ;
external pil::reflect::Class gelly::reflect::typeOfGLMethod ( ) ;
external pil::reflect::Class gelly::reflect::typeOfGLClass ( ) ;
external pil::reflect::Class gelly::reflect::typeOfGLObject ( ) ;
external pil::reflect::Class gelly::exception::reflect::typeOfNoSuchMethodException ( ) ;
external pil::reflect::Class gelly::exception::reflect::typeOfNoSuchFieldException ( ) ;
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
}
external class gelly::GLMethod extends gelly::GLObject {
    pil::Array < pil::String > argumentNames ;
    pil::Array < gelly::Term > statements ;
    pil::String selector ;
    new ( pil::String selector , pil::Array < pil::String > argumentNames , pil::Array < gelly::Term > statements ) ;
    gelly::GLObject invoke ( gelly::GLObject o , pil::Array < gelly::GLObject > args ) ;
}
external class gelly::GLString extends gelly::GLObject {
    pil::String value ;
    new ( pil::String value ) ;
    as<pil::String>;
}
external gelly::GLClass gelly::builtin::string::init ( ) ;
external class gelly::builtin::string::StringConcatMethod extends gelly::GLMethod {
    new ( ) ;
    gelly::GLObject invoke ( gelly::GLObject o , pil::Array < gelly::GLObject > args ) ;
    pil::reflect::Class getClassInfo ( ) ;
}