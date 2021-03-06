/*
 * generated by Xtext 2.18.0
 */
package org.pcl.eqasm.ide

import com.google.inject.Guice
import org.eclipse.xtext.util.Modules2
import org.pcl.eqasm.EqasmRuntimeModule
import org.pcl.eqasm.EqasmStandaloneSetup

/**
 * Initialization support for running Xtext languages as language servers.
 */
class EqasmIdeSetup extends EqasmStandaloneSetup {

	override createInjector() {
		Guice.createInjector(Modules2.mixin(new EqasmRuntimeModule, new EqasmIdeModule))
	}
	
}
