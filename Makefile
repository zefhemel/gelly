gelly.jar: *.pil 
	rm -f *.pil.h
	rm -rf .pil
	pilc -i gelly.pil --java -d .pil
	cd .pil && javac application/Main.java
	cd .pil && jar cmf ../Manifest ../gelly.jar *

clean:
	rm -f *.pil.h
	rm -rf .pil
	rm -f gelly.jar
